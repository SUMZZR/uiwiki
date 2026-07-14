import { execFileSync } from "node:child_process";
import { mkdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";

import type { ComponentEntry } from "../../src/schemas/component-entry";
import { renderDemoInIsolatedProcess } from "./demo-sandbox";

const forbiddenReactPatterns = [
  /\b(?:process\.env|child_process|node:fs|node:vm)\b/u,
  /\b(?:eval|Function)\s*\(/u,
  /dangerouslySetInnerHTML/u,
  /\bfetch\s*\(/u,
];

export async function qualityCheckEntry(entry: ComponentEntry) {
  const forbidden = forbiddenReactPatterns.find((pattern) => pattern.test(entry.code.react));
  if (forbidden) throw new Error(`React source contains forbidden syntax: ${forbidden}`);

  renderDemoInIsolatedProcess(entry.demoCode);

  const validationDirectory = path.join(process.cwd(), ".uiwiki-validation");
  const candidatePath = path.join(validationDirectory, `${entry.slug}.tsx`);
  await mkdir(validationDirectory, { recursive: true });
  await writeFile(candidatePath, entry.code.react, "utf8");

  try {
    execFileSync(
      "pnpm",
      [
        "exec", "tsc", "--noEmit", "--jsx", "react-jsx", "--target", "es2022",
        "--module", "esnext", "--moduleResolution", "bundler", "--esModuleInterop",
        "--skipLibCheck", candidatePath,
      ],
      { cwd: process.cwd(), stdio: "pipe", timeout: 30_000 },
    );
  } catch (error) {
    const output = error && typeof error === "object" && "stderr" in error
      ? String(error.stderr)
      : String(error);
    throw new Error(`TypeScript check failed: ${output.slice(0, 2_000)}`);
  } finally {
    await rm(validationDirectory, { recursive: true, force: true });
  }
}
