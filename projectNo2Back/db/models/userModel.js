const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  ID: Number,
  Name: String,
  Email: String,
  Street: String,
  City: String,
  Zipcode: Number,
  Tasks: Array,
  Posts: Array,
});

const User = mongoose.model("User", userSchema);

module.exports = {
  User,
};
