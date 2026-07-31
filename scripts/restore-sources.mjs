#!/usr/bin/env node
/**
 * Restores large source files from base64 tarball parts before build/dev.
 * Parts: scripts/missing-sources.b64.0 .. b64.N  (or single missing-sources.b64)
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { gunzipSync } from "node:zlib";

const root = join(fileURLToPath(new URL(".", import.meta.url)), "..");
const single = join(root, "scripts/missing-sources.b64");
let b64;
if (existsSync(single)) {
  b64 = readFileSync(single, "utf8").trim();
} else {
  b64 = "";
  for (let i = 0; i < 20; i++) {
    const p = join(root, `scripts/missing-sources.b64.${i}`);
    if (!existsSync(p)) break;
    b64 += readFileSync(p, "utf8").trim();
  }
}
if (!b64) {
  console.warn("[restore-sources] no missing-sources.b64 parts found; skip");
  process.exit(0);
}
const tar = gunzipSync(Buffer.from(b64, "base64"));

let offset = 0;
while (offset + 512 <= tar.length) {
  const header = tar.subarray(offset, offset + 512);
  if (header.every((b) => b === 0)) break;
  const name = header.subarray(0, 100).toString("utf8").replace(/\0.*$/, "");
  const sizeOct = header.subarray(124, 136).toString("utf8").replace(/\0.*$/, "").trim();
  const size = parseInt(sizeOct || "0", 8) || 0;
  const typeFlag = String.fromCharCode(header[156] || 0);
  offset += 512;
  const data = tar.subarray(offset, offset + size);
  offset += Math.ceil(size / 512) * 512;
  if (!name || size === 0 || typeFlag === "x" || typeFlag === "g") continue;
  if (!name.startsWith("src/")) continue;
  const out = join(root, name);
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, data);
  console.log("[restore-sources]", name, size);
}
