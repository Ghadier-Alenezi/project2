const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const userSchema = new mongoose.Schema({
  name: { type: String, trim: true, required: true },
  email: { type: String, trim: true, required: true, unique: true },
  passwordHash: { type: String, trim: true, required: true },
  age: { type: Number, trim: true },
  learnProgrss: [
    {
      type: ObjectId,
      ref: "Lesson",
    },
  ],
},{
  timestamps: true
});

module.exports = mongoose.model("User", userSchema);
