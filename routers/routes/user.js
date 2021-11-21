const express = require("express");
const { addUser, updateUser, getAllusers, deleteUser} = require("./../controllers/user");

const userRouter = express.Router();

userRouter.get("/", getAllusers)
userRouter.post("/newUser", addUser);
userRouter.put("/:id", updateUser)
userRouter.delete("/:id", deleteUser)

module.exports = userRouter;