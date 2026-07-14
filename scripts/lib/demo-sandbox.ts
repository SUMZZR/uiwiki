import { spawnSync } from "node:child_process";
import path from "node:path";

const forbiddenDemoPatterns = [
  /\b(?:process|globalThis|window|document|localStorage|sessionStorage)\b/u,
  /\b(?:fetch|XMLHttpRequest|WebSocket|EventSource)\b/u,
  /\b(?:eval|Function|require)\s*\(/u,
  /\bimport\s*(?:\(|["'{*])/u,
  /\bexport\s/u,
  /dangerouslySetInnerHTML/u,
  /<script\b/iu,
  /\b(?:setInterval|setImmediate)\s*\(/u,
];

export function assertDemoSourceIsSafe(code: string) {
  if (code.length > 24_000) {
    throw new Error("demoCode exceeds the 24 KB safety limit");
  }

  const matched = forbiddenDemoPatterns.find((pattern) => pattern.test(code));
  if (matched) throw new Error(`demoCode contains forbidden syntax: ${matched}`);
}

export function renderDemoInIsolatedProcess(code: string) {
  assertDemoSourceIsSafe(code);
  const worker = path.join(process.cwd(), "scripts", "render-demo-worker.ts");
  const result = spawnSync(process.execPath, ["--import", "tsx", worker], {
    cwd: process.cwd(),
    input: code,
    encoding: "utf8",
    timeout: 5_000,
    maxBuffer: 256_000,
    env: { NODE_ENV: "production" },
  });

  if (result.error) throw result.error;
  if (result.status !== 0) {
    throw new Error(result.stderr.trim() || "Demo SSR worker failed");
  }

  return result.stdout.trim();
}
