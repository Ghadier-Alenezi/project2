const lessonModel = require("./../../db/models/lessonSchema");

// get all lessons
const getAllLessons = (req, res) => {
  lessonModel
    .find()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.send(err);
    });
};

// add lesson
const addLesson = (req, res) => {
  const { level, lesson, title, song, joke, quiz } = req.body;
  const newLesson = new lessonModel({
    level,
    title,
    lesson,
    song,
    joke,
    quiz,
  });
  newLesson
    .save()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.send(err);
    });
};

// update lesson
const updateLesson = (req, res) => {
  const { id } = req.params;
  const { level, lesson, song, joke, quiz } = req.body;
  lessonModel
    .findByIdAndUpdate(
      (_id = id),
      {
        level,
        title,
        lesson,
        song,
        joke,
        quiz,
      },
      { new: true }
    )
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.send(err);
    });
};

// delete lesson
const deleteLesson = (req, res) => {
  const { id } = req.params;
  lessonModel
    .findByIdAndDelete((_id = id), { new: true })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.send(err);
    });
};

module.exports = { getAllLessons, addLesson, updateLesson, deleteLesson };
