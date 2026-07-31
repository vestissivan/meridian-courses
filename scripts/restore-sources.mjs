#!/usr/bin/env node
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { gunzipSync } from "node:zlib";
import c0 from "./chunks/0.mjs";
import c1 from "./chunks/1.mjs";
import c2 from "./chunks/2.mjs";
import c3 from "./chunks/3.mjs";

const root = join(fileURLToPath(new URL(".", import.meta.url)), "..");
const b64 = [c0, c1, c2, c3].join("");
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
