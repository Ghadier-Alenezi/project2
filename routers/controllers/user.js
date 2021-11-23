const userModel = require("./../../db/models/userSchema");

// get all users
const getAllusers = (req, res) => {
  userModel
    .find({})
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.send(err);
    });
};

// add user
const addUser = (req, res) => {
  const { name, email, password, age } = req.body;
  const newUser = new userModel({
    name,
    email,
    password,
    age,
  });
  newUser
    .save()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.send(err);
    });
};

// update user
const updateUser = (req, res) => {
  const { id } = req.params;
  const { name, email, password, age } = req.body;
  userModel
    .findByIdAndUpdate(
      (_id = id),
      {
        name,
        email,
        password,
        age,
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

//  delete user
const deleteUser = (req, res) => {
  const { id } = req.params;
  userModel
    .findByIdAndDelete((_id = id), { new: true })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.send(err);
    });
};

module.exports = { getAllusers, addUser, updateUser, deleteUser };
