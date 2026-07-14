import { getAllComponents } from "../src/lib/content";
import { renderDemoInIsolatedProcess } from "./lib/demo-sandbox";

async function main() {
  const entries = await getAllComponents();
  for (const entry of entries) {
    renderDemoInIsolatedProcess(entry.demoCode);
  }
  console.log(`SSR-rendered ${entries.length} demos in isolated workers.`);
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
