const userModel = require("./../../db/models/userSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// get all users
const getAllusers = async (req, res) => {
  userModel
    .find({})
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      res.send(error);
    });
};

// add user
const addUser = async (req, res) => {
  try {
    const { name, email, password, age } = req.body;
    // validation
    if (!email || !password || !name) {
      return res.status(400).json({
        errorMessage: "You need to enter you name, email and password.",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        errorMessage: "please enter a password of at least 6 chaeacters",
      });
    }
    // make sure no account exist for this email

    const existUser = await userModel.findOne({ email });
    if (existUser) {
      return res.status(400).json({
        errorMessage: "An account with this email already exists.",
      });
    }

    // hash password
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    console.log(passwordHash);

    // save user in db
    const newUser = new userModel({
      name,
      email,
      passwordHash,
      age,
    });
    const savedUser = await newUser.save().then((result) => {
      res.json(result);
    });

    // create JWT token
    const token = jwt.sign(
      {
        id: savedUser._id,
      },
      process.env.JWT_SECERT
    );
    res.cookie("token", token, { httpOnly: true }).send();
  } catch (error) {
    res.send(error);
  }
};

// update user
const updateUser = async (req, res) => {
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

// login user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        errorMessage: "You need to enter your email and password.",
      });
    }
    // get user account
    const existUser = await userModel.findOne({ email });
    if (existUser) {
      return res.status(401).json({
        errorMessage: "wrong email or password",
      });
    }
    // check the password
    const correctPass = await bcrypt.compare(password, existUser.passwordHash);

    if (!correctPass)
      return res.status(401).json({
        errorMessage: "wrong email or password",
      });

    // JWT token
    const token = jwt.sign(
      {
        id: existUser._id,
      },
      process.env.JWT_SECERT
    );
    res.cookie("token", token, { httpOnly: true }).send();
  } catch (error) {
    res.send(error);
  }
};
module.exports = {
  getAllusers,
  addUser,
  updateUser,
  deleteUser,
  loginUser,
};
