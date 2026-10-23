// Inlines the local CSS/JS that Parcel emits into a single bundle.html.
// External links (Google Fonts) stay as they are. <title> is kept near the top
// so the artifact viewer finds it in the first 8 KB.
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const dist = path.resolve("dist");
let html = readFileSync(path.join(dist, "index.html"), "utf8");

const local = (href) => !/^["']?https?:\/\//.test(href);
const read = (href) => readFileSync(path.join(dist, href.replace(/^\//, "")), "utf8");

const styles = [];
html = html.replace(/<link rel=stylesheet href=([^\s>]+)>/g, (m, href) => {
  if (!local(href)) return m;
  styles.push(read(href));
  return "";
});

html = html.replace(/<script type=module src=([^\s>]+)><\/script>/g, (m, src) => {
  if (!local(src)) return m;
  const js = read(src).replace(/<\/script/gi, "<\\/script");
  return `<script type="module">${js}</script>`;
});

// Styles go after the head metadata, right before <body>.
html = html.replace("<body>", () => `<style>${styles.join("\n")}</style><body>`);

// The artifact host supplies doctype/html/head; the page sets lang itself (main.tsx).
html = html.replace(/^<!DOCTYPE html>\s*<html[^>]*>/i, "").replace(/<\/html>\s*$/i, "");

writeFileSync("bundle.html", html);
const kb = (Buffer.byteLength(html) / 1024).toFixed(0);
const titleAt = html.indexOf("<title>");
console.log(`bundle.html · ${kb} KB · <title> at byte ${titleAt}`);
