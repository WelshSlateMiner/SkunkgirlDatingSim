// Runs the companion unit tests (TypeScript, "@/" alias) on any Node 20+ via jiti.
import { spawnSync } from "node:child_process";
import { readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dir = path.join(root, "src/lib/companion");
const files = readdirSync(dir).filter((f) => f.endsWith(".test.ts")).map((f) => path.join(dir, f));
const run = spawnSync(process.execPath, ["--import", "jiti/register", "--test", ...files], {
  stdio: "inherit",
  env: { ...process.env, JITI_ALIAS: JSON.stringify({ "@": path.join(root, "src") }) },
});
process.exit(run.status ?? 1);
