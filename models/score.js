const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const scoreSchema = new Schema({
  name: { type: String, trim: true, required: "Enter name" },
  rounds: { type: Number },
  points: { type: Number },
});

const Score = mongoose.model("Score", scoreSchema);

module.exports = Score;
