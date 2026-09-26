// Genera one-empire-ghl.html (versión de un solo archivo para GHL)
// a partir de index.html + styles.css + script.js.
// Uso: node build.js

const fs = require("fs");
const path = require("path");

const dir = __dirname;
const html = fs.readFileSync(path.join(dir, "index.html"), "utf8");
const css = fs.readFileSync(path.join(dir, "styles.css"), "utf8");
const js = fs.readFileSync(path.join(dir, "script.js"), "utf8");

let output = html
  .replace(
    '<link rel="stylesheet" href="styles.css">',
    `<style>\n${css}\n</style>`
  )
  .replace(
    '<script src="script.js"></script>',
    `<script>\n${js}\n</script>`
  );

fs.writeFileSync(path.join(dir, "one-empire-ghl.html"), output);
console.log("one-empire-ghl.html generado.");
