const lessonModel = require("./../../db/models/lessonSchema");

// get all lessons
const getAllLessons = async (req, res) => {
  try {
    lessonModel.find().then((result) => {
      res.json(result);
    });
  } catch (err) {
    res.status(500).send();
  }
};

// add lesson
const addLesson = (req, res) => {
  try {
    const { level, title, lesson, src, song, joke, quiz } = req.body;
    const newLesson = new lessonModel({
      level,
      title,
      lesson,
      src,
      song,
      joke,
      quiz,
    });
    newLesson.save().then((result) => {
      res.json(result);
    });
  } catch (err) {
    res.send(err);
  }
};

// update lesson
const updateLesson = (req, res) => {
  try {
    const { id } = req.params;
    const { level, title, lesson, src, song, joke, quiz } = req.body;
    lessonModel
      .findByIdAndUpdate(
        (_id = id),
        {
          level,
          title,
          lesson,
          src,
          song,
          joke,
          quiz,
        },
        { new: true }
      )
      .then((result) => {
        res.json(result);
      });
  } catch (err) {
    res.send(err);
  }
};

// delete lesson
const deleteLesson = (req, res) => {
  try {
    const { id } = req.params;
    lessonModel.findByIdAndDelete((_id = id), { new: true }).then((result) => {
      res.json(result);
    });
  } catch (err) {
    res.send(err);
  }
};

module.exports = { getAllLessons, addLesson, updateLesson, deleteLesson };
