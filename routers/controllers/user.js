const userModel = require("../../db/models/user");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const SALT = Number(process.env.SALT);
const secret = process.env.SECRET_KEY;

// get all users
const getAllusers = async (req, res) => {
  userModel
    .find()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      res.status(400).send(error);
    });
};

// get user by id
const idUser = (req, res) => {
  try {
    const { id } = req.params;
    userModel
      .findById(id)
      .exec()
      .then((result) => {
        res.status(200).send(result);
      });
  } catch (error) {
    res.status(400).send(error);
  }
};

// add user
const addUser = async (req, res) => {
  try {
    const { name, email, password, age, role } = req.body;
    const savedEmail = email.toLowerCase();
    const hashedPassword = await bcrypt.hash(password, SALT);

    const newUser = new userModel({
      name,
      email: savedEmail,
      password: hashedPassword,
      age,
      role,
    });
    newUser.save().then((result) => {
      res.status(201).json(result);
    });
  } catch (error) {
    res.status(400).send(err);
  }
};

// update user
const updateUser = async (req, res) => {
  try {
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
      .exec()
      .then((result) => {
        res.status(200).json(result);
      });
  } catch (err) {
    res.status(400).send(err);
  }
};

//  delete user
const deleteUser = (req, res) => {
  try {
    const { id } = req.params;
    userModel.findByIdAndDelete((_id = id)).then((result) => {
      res.status(200).json(result);
    });
  } catch (error) {
    res.status(400).send(error);
  }
};

// login user
const login = async (req, res) => {
  const { email, password } = req.body;
  const savedEmail = email.toLowerCase();
  try {
    userModel.findOne({ email: savedEmail }).then(async (result) => {
      if (result) {
        if (result.email == savedEmail) {
          const hashedPassword = await bcrypt.compare(
            password,
            result.password
          );
          const payload = {
            role: result.role,
          };
          const options = {
            expiresIn: "600m",
          };
          if (hashedPassword) {
            const token = jwt.sign(payload, secret, options);
            res.status(200).json({ result, token });
          } else {
            res.status(400).send("invalid email or password");
          }
        } else {
          res.status(400).send("invalid email or password");
        }
      } else {
        res.status(404).send("this email not exist!");
      }
    });
  } catch (error) {
    res.status(400).send(error);
  }
};

// log Out user
const logOut = (req, res) => {
  try {
    res.clearCookie("clear").then((result) => {
      res.status(200).send(result);
    });
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = {
  getAllusers,
  addUser,
  updateUser,
  deleteUser,
  login,
  logOut,
  idUser,
};
