import { categories } from "../src/lib/categories";
import { getAllComponents } from "../src/lib/content";

async function main() {
  const entries = await getAllComponents();

  if (entries.length > 0 && entries.length < 30) {
    throw new Error(`Expected at least 30 entries; received ${entries.length}`);
  }

  if (entries.length > 0) {
    for (const category of categories) {
      const count = entries.filter((entry) => entry.category === category).length;
      if (count < 3) {
        throw new Error(`Category ${category} requires at least 3 entries; received ${count}`);
      }
    }
  }

  console.log(`Validated ${entries.length} component entries.`);
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
