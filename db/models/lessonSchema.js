const mongoose = require("mongoose");

const lessonSchema = new mongoose.Schema({
  lesson: { type: String },
  song: { type: String },
  joke: { type: String },
  quiz: { type: String },
});

module.exports = mongoose.model("Lesson", lessonSchema);
