const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  try {
    // console.log("it works!");

    const token = req.cookies.token;
    if (!token) return res.status(401).json({ errorMessage: "Unauthorized." });

    const validUser = jwt.verify(token, process.env.JWT_SECERT);
    req.user = validUser.id;
    next();
  } catch (error) {
    return res.status(401).json({ errorMessage: "Unauthorized." });
  }
}

module.exports = auth;
