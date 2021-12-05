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

userRouter.get("/users", getAllusers);
userRouter.post("/register", addUser);
userRouter.put("/updateUser/:id", updateUser);
userRouter.delete("/deleteUser/:id", deleteUser);
userRouter.post("/login", login);
userRouter.post("/logOut", logOut);
userRouter.get("/userById/:id", idUser);

module.exports = userRouter;
