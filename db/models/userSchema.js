const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, trim: true, required: true },
  email: { type: String, trim: true, required: true, unique: true },
  password: { type: String, trim: true, required: true },
  age: { type: Number, trim: true },
  learnProgrss:[{
    type: mongoose.Schema.Types.ObjectId,
    ref:"Lesson",
  }]
});

module.exports = mongoose.model("User", userSchema);
