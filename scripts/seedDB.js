const mongoose = require("mongoose");
const db = require("../models");

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/hall-of-fame");

const scoreSeed = [
  {
    name: "Ted",
    rounds: 47,
    points: 250,
  },
  {
    name: "Wanda",
    rounds: 50,
    points: 120,
  },
  {
    name: "Ned",
    rounds: 15,
    points: 48,
  },
  {
    name: "Charlie",
    rounds: 300,
    points: 1457,
  },
  {
    name: "Stacy",
    rounds: 3,
    points: 15,
  },
];

db.Scores.remove({})
  .then(() => db.Scores.collection.insertMany(scoreSeed))
  .then((data) => {
    console.log(data.result.n + " records inserted");
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
