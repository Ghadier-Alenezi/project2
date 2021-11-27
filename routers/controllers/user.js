const userModel = require("./../../db/models/userSchema");

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

// get user by id
const idUser = (req, res) => {
  try {
    const { id } = req.params;
    userModel
      .findById(id)
      .exec()
      .then((result) => {
        res.send(result);
      });
    // send user info
  } catch (error) {
    res.send(error);
  }
};

// add user
const addUser = async (req, res) => {
  userModel.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      return res.status(400).json("Email already registerd");
    } else {
      const { name, email, password, age } = req.body;
      const newUser = new userModel({
        name,
        email,
        password,
        age,
      });
      newUser.save();
      if (newUser) {
        res.status(200).json({message:"registerd successfully", user: newUser})
      }
    }
  });
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
      .then((result) => {
        res.json(result);
      });
  } catch (error) {
    res.send(error);
  }
};

//  delete user
const deleteUser = (req, res) => {
  try {
    const { id } = req.params;
    userModel.findByIdAndDelete((_id = id), { new: true }).then((result) => {
      res.json(result);
    });
  } catch (error) {
    res.send(error);
  }
};

// login user
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        errorMessage: "You need to enter your email and password.",
      });
    }
    // get user account
    const existUser = await userModel.findOne({ email });
    if (!existUser) {
      return res.status(401).json({
        errorMessage: "wrong email or password",
      });
    }
    // check the password
    if (password === existUser.password);
    res.send({ existUser });
  } catch (error) {
    res.send(error);
  }
};

// log Out user
const logOut = (req, res) => {
  try {
    res.clearCookie("clear");
    res.send({ message: "log out successfully" });
  } catch (error) {
    return res.json(null);
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
