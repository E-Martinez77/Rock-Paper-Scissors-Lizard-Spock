const router = require("express").Router();
const Score = require("../models/score.js");

router.post("/api/new-score", ({ body }, res) => {
  Score.create(body)
    .then((dbScore) => {
      res.json(dbScore);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.get("/api/highscores", (_, res) => {
  Score.find({})
    .sort({ points: -1 })
    .then((dbScore) => {
      res.json(dbScore);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

module.exports = router;
