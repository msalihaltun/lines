import { stat } from "node:fs/promises";

async function linesOfFile(path: string) {
  const text = await Bun.file(path).text();
  return text.split("\n");
}

const text = await Bun.stdin.text();
const lines = text.split("\n").filter((line) => line.trim() !== "");

const promises = lines.map(async (path) => {
  const stats = await stat(path);
  if (stats.isDirectory()) {
    return 0;
  }
  const lines = await linesOfFile(path);
  return lines.length;
});

const result = await Promise.all(promises);

console.log(result.filter(Boolean).reduce((a, b) => a + b, 0));
