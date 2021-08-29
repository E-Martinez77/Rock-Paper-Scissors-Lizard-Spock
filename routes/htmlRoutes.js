const path = require("path");

module.exports = (app) => {
  app.get(`*`, (_, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });
};
