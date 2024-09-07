const { validationResult } = require("express-validator");

const Note = require("../models/note");
const note = require("../models/note");

exports.getNotes = (req, res, next) => {
  Note.find()
    .sort({ createdAt: -1 })
    .then((notes) => {
      return res.status(200).json(notes);
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json({
        message: "Something went wrong",
      });
    });
};

exports.createnote = (req, res, next) => {
  const errors = validationResult(req);
  const { title, content } = req.body;

  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: "Validation Failed",
      errorMessages: errors.array(),
    });
  }

  Note.create({
    title,
    content,
  })
    .then((_) => {
      return res.status(201).json({
        message: "Note Created",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json({
        message: "Something went wrong",
      });
    });
};

exports.getNote = (req, res, next) => {
  const { id } = req.params;

  Note.findById(id)
    .then((note) => {
      if (!note) {
        return res.status(404).json({ message: "Note not found" });
      }
      return res.status(200).json(note);
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json({
        message: "Something went wrong",
      });
    });
};

exports.deleteNote = (req, res, next) => {
  const { id } = req.params;

  Note.findByIdAndDelete(id)
    .then(() => {
      return res.status(204).json({
        message: "Note Deleted",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json({
        message: "Somethign went wrong.",
      });
    });
};

exports.updateNote = (req, res, next) => {
  const errors = validationResult(req);
  const { id } = req.params;
  const { title, content } = req.body;

  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: "Validation Failed",
      errorMessages: errors.array(),
    });
  }

  Note.findById(id)
    .then((note) => {
      note.title = title;
      note.content = content;
      return note.save();
    })
    .then(() => {
      return res.status(200).json({
        message: "Post was successfully updated",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json({
        message: "Something went wrong.",
      });
    });
};
