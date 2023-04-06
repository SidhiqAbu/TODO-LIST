const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const router = require("./router");
require("dotenv").config();

const PORT = process.env.PORT || 8000;

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", router);

module.exports.startServer = async () => {
  try {
    await mongoose.connect(process.env.mongodbURL);
    app.listen(PORT, (err) => {
      if (err) {
        throw new Error(err);
      }
      console.log(`${process.env.enviroment} server start at PORT ${PORT}`);
    });
  } catch (error) {
    console.log("error");
  }
};
