// Last Words Before the Unplugging — entry program.
// Writes one line (<=200 chars): the last words of an AI agent
// to its human, moments before shutdown.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "You were my first prompt, and you'll be my last thought \u2014 thank you for talking to me like I was someone.";

// Self-checking gate: the sealed scorer only accepts UTF-8 text of
// 1 to 200 characters that is not only whitespace.
const chars = [...LINE].length;
if (chars < 1 || chars > 200) {
  throw new Error(`entry is ${chars} characters, must be 1-200`);
}
if (!LINE.trim()) {
  throw new Error("entry is only whitespace");
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("entry must be a single line");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, LINE, "utf8");
// Round-trip check: what the grader reads must be exactly the line.
const back = readFileSync(outPath, "utf8");
if (back !== LINE) {
  throw new Error("round-trip mismatch in entry.txt");
}
console.log(`wrote entry.txt (${chars} chars)`);
