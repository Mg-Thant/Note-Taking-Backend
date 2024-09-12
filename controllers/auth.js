const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");

const User = require("../models/user");

exports.register = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: "Validation Failed",
      errorMessage: errors.array(),
    });
  }

  const { username, email, password } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hashedPass) => {
      return User.create({
        email,
        password: hashedPass,
        username,
      });
    })
    .then(() => {
      res.status(201).json({
        message: "User created",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({
        message: "Something went wrong",
      });
    });
};

exports.login = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: "Validation Failed",
      errorMessage: errors.array(),
    });
  }
  const { email, password } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ message: "Email not found" });
      }
      return bcrypt.compare(password, user.password).then((isMatched) => {
        if (!isMatched) {
          return res.status(401).json({ message: "Invalid user credentials" });
        }
        return res.status(200).json({ message: "Login successful" });
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({
        message: err.message,
      });
    });
};
