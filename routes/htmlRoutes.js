const path = require("path");

module.exports = (app) => {
  app.get("/high-scores", (_, res) => {
    res.sendFile(path.join(__dirname, "../public/high-scores.html"));
  });

  app.get(`*`, (_, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });
};
