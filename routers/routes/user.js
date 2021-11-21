const express = require("express");
const { addUser} = require("./../controllers/user");

const userRouter = express.Router();

userRouter.post("/newUser", addUser);

module.exports = userRouter;