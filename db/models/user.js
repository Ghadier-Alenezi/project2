const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const userSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true, required: true },
    email: { type: String, trim: true, required: true, unique: true },
    password: { type: String, trim: true, required: true },
    img: {
      type: String,
      default:
        "https://ih1.redbubble.net/image.1481363416.9728/st,small,507x507-pad,600x600,f8f8f8.jpg",
    },
    age: { type: Number, trim: true },
    role: [{ type: mongoose.Schema.Types.ObjectId, ref: "Role" }],
    learnProgrss: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Lesson",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
