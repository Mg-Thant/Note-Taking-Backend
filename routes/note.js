const express = require("express");
const { body } = require("express-validator");

const noteController = require("../controllers/note");

const router = express.Router();

// API Endpoints

// GET /notes
router.get("/notes", noteController.getNotes);

// POST /create
router.post(
  "/create",
  [
    body("title")
      .trim()
      .isLength({ min: 4 })
      .withMessage("Title is too short")
      .isLength({ max: 100 })
      .withMessage("Title is too long"),
    body("content").isLength({ min: 5 }).withMessage("Content is too short"),
  ],
  noteController.createnote
);

// GET /notes/:id
router.get("/notes/:id", noteController.getNote);

// DELETE /delete/:id
router.delete("/delete/:id", noteController.deleteNote);

//patch /edit
router.patch(
  "/edit",
  [
    body("title")
      .trim()
      .isLength({ min: 4 })
      .withMessage("Title is too short")
      .isLength({ max: 30 })
      .withMessage("Title is too long"),
    body("content").isLength({ min: 5 }).withMessage("Content is too short"),
  ],
  noteController.updateNote
);

module.exports = router;
