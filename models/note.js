const { model, Schema } = require("mongoose");

const noteSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      minLength: 4,
      maxLength: 30,
    },
    content: {
      type: String,
      required: true,
      minLength: 5,
    },
    creator: {
      type: String,
      default: "Anonymous",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Note", noteSchema);
