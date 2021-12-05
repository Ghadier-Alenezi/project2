const express = require("express");
const userRouter = express.Router();

const authentication = require("./../middleware/authentication");
const authorization = require("./../middleware/authorization");

const {
  getAllusers,
  addUser,
  updateUser,
  deleteUser,
  login,
  logOut,
  idUser,
} = require("./../controllers/user");

userRouter.post("/register", addUser);
userRouter.post("/login", login);

userRouter.post("/logOut", authentication, logOut);
userRouter.put("/updateUser/:id", authentication, updateUser);
userRouter.delete("/deleteUser/:id", authentication, deleteUser);

userRouter.get("/users", authentication, authorization, getAllusers);
userRouter.get("/userById/:id", authentication, authorization, idUser);

module.exports = userRouter;
