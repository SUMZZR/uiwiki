import vm from "node:vm";

import { motion } from "framer-motion";
import * as React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { transform } from "sucrase";

async function readStandardInput() {
  const chunks: Buffer[] = [];
  for await (const chunk of process.stdin) chunks.push(Buffer.from(chunk));
  return Buffer.concat(chunks).toString("utf8");
}

async function main() {
  const source = await readStandardInput();
  const compiled = transform(`result = (${source});`, {
    transforms: ["typescript", "jsx"],
    jsxRuntime: "classic",
  }).code;
  const sandbox: { React: typeof React; motion: typeof motion; result?: React.ReactNode } = {
    React,
    motion,
  };
  const context = vm.createContext(sandbox, {
    codeGeneration: { strings: false, wasm: false },
  });
  const script = new vm.Script(compiled, {
    filename: "generated-demo.js",
  });

  script.runInContext(context, { timeout: 1_000 });
  const markup = renderToStaticMarkup(sandbox.result);
  if (!markup || markup.length < 20) throw new Error("Demo rendered empty markup");
  process.stdout.write(markup.slice(0, 200));
}

main().catch((error: unknown) => {
  process.stderr.write(error instanceof Error ? error.stack ?? error.message : String(error));
  process.exitCode = 1;
});
