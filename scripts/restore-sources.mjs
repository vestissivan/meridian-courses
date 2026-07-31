#!/usr/bin/env node
/**
 * Restores large sources and public images from chunk modules before build.
 */
import { writeFileSync, mkdirSync, existsSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { gunzipSync } from "node:zlib";
import { pathToFileURL } from "node:url";

const scriptsDir = fileURLToPath(new URL(".", import.meta.url));
const root = join(scriptsDir, "..");

async function loadChunks(dir) {
  if (!existsSync(dir)) return "";
  const files = readdirSync(dir)
    .filter((f) => f.endsWith(".mjs"))
    .sort((a, b) => parseInt(a, 10) - parseInt(b, 10));
  let b64 = "";
  for (const f of files) {
    const mod = await import(pathToFileURL(join(dir, f)).href);
    b64 += mod.default;
  }
  return b64;
}

function extractTarGz(b64, nameFilter) {
  if (!b64) return;
  const tar = gunzipSync(Buffer.from(b64, "base64"));
  let offset = 0;
  while (offset + 512 <= tar.length) {
    const header = tar.subarray(offset, offset + 512);
    if (header.every((b) => b === 0)) break;
    const name = header.subarray(0, 100).toString("utf8").replace(/\0.*$/, "");
    const sizeOct = header
      .subarray(124, 136)
      .toString("utf8")
      .replace(/\0.*$/, "")
      .trim();
    const size = parseInt(sizeOct || "0", 8) || 0;
    const typeFlag = String.fromCharCode(header[156] || 0);
    offset += 512;
    const data = tar.subarray(offset, offset + size);
    offset += Math.ceil(size / 512) * 512;
    if (!name || size === 0 || typeFlag === "x" || typeFlag === "g") continue;
    if (nameFilter && !nameFilter(name)) continue;
    const out = join(root, name.startsWith("images/") ? join("public", name) : name);
    mkdirSync(dirname(out), { recursive: true });
    writeFileSync(out, data);
    console.log("[restore]", out.replace(root + "/", ""), size);
  }
}

const srcB64 = await loadChunks(join(scriptsDir, "chunks"));
extractTarGz(srcB64, (n) => n.startsWith("src/"));

const imgB64 = await loadChunks(join(scriptsDir, "img-chunks"));
extractTarGz(imgB64, (n) => n.startsWith("images/"));
