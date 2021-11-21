const express = require("express");
const { getAlllevels, addLevel } = require("./../controllers/level");

const levelRouter = express.Router();

levelRouter.get("/", getAlllevels);
levelRouter.post("/newLevel", addLevel);

module.exports = levelRouter;
