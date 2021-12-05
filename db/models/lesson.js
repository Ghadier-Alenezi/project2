const mongoose = require("mongoose");

const lessonSchema = new mongoose.Schema(
  {
    level: { type: Number, default: 1 },
    title: { type: String, required: true },
    lesson: { type: { type: String, required: true } },
    src: { type: String },
    song: { type: String },
    joke: { type: String },
    quiz: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Lesson", lessonSchema);
