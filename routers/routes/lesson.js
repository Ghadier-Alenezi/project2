const express = require("express");
const { getAllLessons, addLesson } = require("./../controllers/lesson");

const lessonRouter = express.Router();

lessonRouter.get("/", getAllLessons);
lessonRouter.post("/newLesson", addLesson);

module.exports = lessonRouter;
