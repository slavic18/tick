const ejs = require("ejs");
const public = require("./public");
const Router = {
  init: async (req, res) => {
    const requestUrl = req.url;
    const splittedUrl = requestUrl.split("/");
    if (splittedUrl.length > 1 && splittedUrl[1] === "public") {
      public(req, res);
    }
    if (requestUrl === "/") {
      const htmlTemplate = await ejs.renderFile("client/build/index.html");
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(htmlTemplate);
    }
  }
};

module.exports = Router;
