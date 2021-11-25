const express = require("express");
// const auth = require("./../controllers/auth");
const {
  getAllLessons,
  addLesson,
  updateLesson,
  deleteLesson,
} = require("./../controllers/lesson");

const lessonRouter = express.Router();

lessonRouter.get("/", getAllLessons);
lessonRouter.post("/newLesson", addLesson);
lessonRouter.put("/:id", updateLesson);
lessonRouter.delete("/:id", deleteLesson);

module.exports = lessonRouter;
