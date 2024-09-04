const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const noteRoute = require("./routes/note");

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use(noteRoute);

mongoose
  .connect(process.env.MONGODB_URL)
  .then((_) => {
    app.listen(8010);
    console.log("Connected to mongodb");
  })
  .catch((err) => console.log(err));
