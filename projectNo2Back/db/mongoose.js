// this file will handle connection logic to the mongoDB database

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose
  .connect("mongodb://localhost:27017/UsersDB", { useNewUrlParser: true })
  .then(() => {
    console.log("Connected to mongodb successfully!");
  })
  .catch((err) => {
    console.log("Error while attempted to log to mongodb");
    console.log(err);
  });

module.exports = {
  mongoose,
};
