const express = require("express");
const app = express();
const { mongoose } = require("./db/mongoose");
// load in the mongoose models
const { User } = require("./db/models/userModel");
const cors = require("cors");

// instead of body parser, parse json bodies
app.use(express.json());
//Parse URL-encoded bodies
app.use(express.urlencoded());
// enable cors policy
app.use(cors());

/**
 * ROUTES for the angular app
 *
 */
app.get("/", (req, res) => {
  // just rendering some home page
  res.send("Project #2 BackEnd");
});

app.get("/usersData", (req, res) => {
  // we want to return an array of all the users data from the database
  User.find({}).then((users) => {
    res.send(users);
  });
});

app.get("/userData/:id", (req, res) => {
  // here i want to get a specific user data from the data base
  User.findById({ _id: req.params.id }).then((user) => {
    res.send(user);
  });
});

app.patch("/updateData/:id", (req, res) => {
  /*  -here i get the data from user form by user id
        and send it to update in the data base.
    */
  console.log(req.body); // the body elements should be similar to the schema
  User.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: req.body, // update the chosen document with the request body
    }
  ).then(() => {
    res.sendStatus(200);
  });
});

app.post("/addPost/:id", (req, res) => {
  /*
    here i want to add a post to user by id and insert the post
    to the user database.
  */
  User.findOne({
    _id: req.params.id,
  }).then((user) => {
    user.Posts.push(req.body);
    user.save();
    res.sendStatus(200);
  });
});

app.post("/addTodo/:id", (req, res) => {
  /**
   * here i want to add a new todo quest and insert it
   * right into a specific user
   */
  User.findOne({
    _id: req.params.id,
  }).then((user) => {
    user.Tasks.push(req.body);
    user.save();
    res.sendStatus(200);
  });
});

app.delete("/delUserData/:id", (req, res) => {
  /**
   * here i want to delte a user data
   * by specific id
   */
  User.findOneAndDelete({
    _id: req.params.id,
  }).then((removedUserDocs) => {
    res.send(removedUserDocs);
  });
});

app.post("/addUser", (req, res) => {
  // here i want to add a new user
  console.log(req.body);
  let Name = req.body.name; // should match the schema name
  let Email = req.body.email; // should match the schema name
  let newUser = new User({
    Name,
    Email,
  });

  newUser.save().then((newUserDocs) => {
    // the full user document is returned include id
    res.send(newUserDocs);
  });
});
/**
 * searching if the name or email contains the query.
 * you have to press the search button in order to reduce the amount of requests
 * and make the serch happen in the backend.
 */
app.get("/search/:query", (req, res) => {
  User.find({
    $or: [
      { Name: { $regex: req.params.query } },
      { Email: { $regex: req.params.query } },
    ],
  }).then((usersList) => {
    res.send(usersList);
  });
});

/* END OF API ROUTES */

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
