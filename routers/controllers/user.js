const userModel = require("./../../db/models/userSchema");

// add user
const createUser = (req, res) => {
    const { name, email, password } = req.body;
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
  
  module.exports = { createUser };
