const express = require("express");

const {
  getAllusers,
  addUser,
  updateUser,
  deleteUser,
  login,
  logOut,
  idUser
} = require("./../controllers/user");

const userRouter = express.Router();

userRouter.get("/", getAllusers);
userRouter.post("/newUser", addUser);
userRouter.put("/:id", updateUser);
userRouter.delete("/:id", deleteUser);
userRouter.post("/login", login);
userRouter.post("/logOut", logOut);
userRouter.get("/byId/:id", idUser);

module.exports = userRouter;
