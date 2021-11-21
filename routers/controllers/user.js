const userModel = require("./../../db/models/userSchema");

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
  
  module.exports = { addUser };
