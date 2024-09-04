const { validationResult } = require("express-validator");

exports.getNotes = (req, res, next) => {};

exports.createnote = (req, res, next) => {
  const errors = validationResult(req);
  const { title, content } = req.body;

  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: "Validation Failed",
      errorMessages: errors.array(),
    });
  }
  res.status(201).json({
    message: "Note Created",
    data: {
      title,
      content,
    },
  });
};
