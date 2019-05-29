const path = require("path");
const fs = require("fs");
module.exports = async function(req, res) {
  const filePath = "." + req.url;
  const extname = String(path.extname(filePath)).toLowerCase();
  const mimeTypes = {
    ".html": "text/html",
    ".js": "text/javascript",
    ".css": "text/css",
    ".json": "application/json",
    ".png": "image/png",
    ".jpg": "image/jpg",
    ".gif": "image/gif"
  };

  const contentType = mimeTypes[extname] || "application/octet-stream";

  fs.readFile(filePath, function(error, content) {
    if (error) {
      if (error.code == "ENOENT") {
        res.writeHead(404, { "Content-Type": contentType });
        res.end("", "utf-8");
      } else {
        res.writeHead(500);
        res.end();
      }
    } else {
      res.writeHead(200, { "Content-Type": contentType });
      res.end(content, "utf-8");
    }
  });
};
