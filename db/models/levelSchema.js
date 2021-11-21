const mongoose = require("mongoose");

const levelSchema = new mongoose.Schema({
  level: { type: Number, default: 1 },
  lesson: { type: String },
  song: { type: String },
  joke: { type: String },
  img: { type: String },
  quiz: { type: String },
});

module.exports = mongoose.model("Level", levelSchema);
