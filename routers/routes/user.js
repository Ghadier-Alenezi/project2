const express = require("express");
// const auth = require("./../controllers/auth");

const {
  getAllusers,
  addUser,
  updateUser,
  deleteUser,
  loginUser
} = require("./../controllers/user");

const userRouter = express.Router();

userRouter.get("/", getAllusers);
userRouter.post("/newUser", addUser);
userRouter.put("/:id", updateUser);
userRouter.delete("/:id", deleteUser);
userRouter.post("/login", loginUser);

module.exports = userRouter;
