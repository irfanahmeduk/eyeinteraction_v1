const http = require("http");
const next = require("next");

const port = process.env.PORT || 3000;
const hostname = "0.0.0.0";

const app = next({
  dev: process.env.NODE_ENV !== "production",
});

const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    http.createServer((req, res) => {
      handle(req, res);
    }).listen(port, hostname, () => {
      console.log(`Next.js running on ${hostname}:${port}`);
    });
  })
  .catch((err) => {
    console.error("Failed to start Next.js:", err);
    process.exit(1);
  });