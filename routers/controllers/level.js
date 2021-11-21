const levelModel = require("./../../db/models/levelSchema");

// get all levels
const getAlllevels = (req, res) => {
  levelModel
    .find()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.send(err);
    });
};
// add level
const addLevel = (req, res) => {
  const { level, lesson, song, joke, quiz } = req.body;
  const newLevel = new levelModel({
    level,
    lesson,
    song,
    joke,
    quiz,
  });
  newLevel
    .save()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.send(err);
    });
};

// update level

module.exports = { getAlllevels, addLevel };
