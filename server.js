const http = require("http");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const port = parseInt(process.env.PORT, 10) || 3000;
const hostname = "0.0.0.0";

app.prepare().then(() => {
  http
    .createServer(async (req, res) => {
      try {
        await handle(req, res);
      } catch (err) {
        console.error("Server error:", err);
        res.statusCode = 500;
        res.end("Internal Server Error");
      }
    })
    .listen(port, hostname, (err) => {
      if (err) throw err;
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});