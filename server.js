/* =====================================================================
   FILE: server.js
   PURPOSE (beginner summary):
     A tiny local web server so you can open FocusNest at
     http://localhost:8080. It only serves the files in this folder —
     no database, no AI, no tracking.
   RUN:  node server.js        (no npm install needed)
   SECURITY: only files inside this folder are served; hidden files
     (.git, .env, …) and this server file itself are refused.
   ===================================================================== */
const http = require("http"), fs = require("fs"), path = require("path");

const PORT = process.env.PORT || 8080, ROOT = __dirname;
const TYPES = { ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".css": "text/css", ".json": "application/json", ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".gif": "image/gif", ".svg": "image/svg+xml", ".md": "text/plain; charset=utf-8" };

// The two "cross-origin isolation" headers let the browser use several CPU cores for the
// natural voice (js/kokoro-worker.js), which makes it speak several times faster.
// "credentialless" keeps fonts, icons and libraries from other sites loading normally.
const ISOLATION = { "Cross-Origin-Opener-Policy": "same-origin", "Cross-Origin-Embedder-Policy": "credentialless" };
function send(res, code, body, type) { res.writeHead(code, Object.assign({ "Content-Type": type || "text/plain; charset=utf-8" }, ISOLATION)); res.end(body); }

http.createServer((req, res) => {
  let rel;
  try { rel = decodeURIComponent(new URL(req.url, "http://localhost").pathname); } catch (e) { return send(res, 400, "Bad request"); }
  if (rel === "/") rel = "/index.html";
  const p = path.normalize(path.join(ROOT, rel));
  if (!p.startsWith(ROOT + path.sep) || rel.split("/").some(seg => seg.startsWith(".")) || /node_modules/.test(p) || path.basename(p) === "server.js") return send(res, 403, "Forbidden");
  fs.readFile(p, (err, data) => err ? send(res, 404, "Not found") : send(res, 200, data, TYPES[path.extname(p).toLowerCase()] || "application/octet-stream"));
}).listen(PORT, () => console.log(`FocusNest → http://localhost:${PORT}`));
