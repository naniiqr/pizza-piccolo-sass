// Genera one-empire-ghl.html (versión de un solo archivo para GHL)
// a partir de index.html + styles.css + script.js, incrustando también
// las imágenes de assets/ como base64 para que el archivo sea 100%
// autocontenido (sin depender de rutas externas al pegarlo en GHL).
// Uso: node build.js

const fs = require("fs");
const path = require("path");

const dir = __dirname;
const html = fs.readFileSync(path.join(dir, "index.html"), "utf8");
const css = fs.readFileSync(path.join(dir, "styles.css"), "utf8");
const js = fs.readFileSync(path.join(dir, "script.js"), "utf8");

const MIME = { ".webp": "image/webp", ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".svg": "image/svg+xml" };

function toDataUri(relPath) {
  const ext = path.extname(relPath).toLowerCase();
  const mime = MIME[ext];
  if (!mime) return null;
  const filePath = path.join(dir, relPath);
  if (!fs.existsSync(filePath)) return null;
  const base64 = fs.readFileSync(filePath).toString("base64");
  return `data:${mime};base64,${base64}`;
}

let output = html
  .replace(
    '<link rel="stylesheet" href="styles.css">',
    `<style>\n${css}\n</style>`
  )
  .replace(
    '<script src="script.js"></script>',
    `<script>\n${js}\n</script>`
  )
  .replace(/src="(assets\/[^"]+)"/g, (match, relPath) => {
    const dataUri = toDataUri(relPath);
    return dataUri ? `src="${dataUri}"` : match;
  });

fs.writeFileSync(path.join(dir, "one-empire-ghl.html"), output);
console.log("one-empire-ghl.html generado.");
