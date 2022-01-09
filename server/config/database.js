require("dotenv").config();
const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const conn = mongoose.createConnection(process.env.DB_STRING);

const userSchema = new mongoose.Schema({
  fName: String,
  lName: String,
  username: String,
  password: String,
});

userSchema.plugin(passportLocalMongoose);

const User = conn.model("User", userSchema);

module.exports = conn;
