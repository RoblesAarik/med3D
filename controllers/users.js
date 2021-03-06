const express = require("express");
const router = express.Router();
const User = require("../models/users.js");
// const Appointment = require("../models/appointment.js");
const bcrypt = require("bcrypt");

/** Create new users */
router.get("/new", (req, res) => {
  res.render("users/new.ejs");
});

router.post("/", (req, res) => {
    // username in all lowercase
    req.body.username = req.body.username.toLowerCase();
    
    // encrypt the password before creating record in the database.
  req.body.password = bcrypt.hashSync(
    req.body.password,
    bcrypt.genSaltSync(10)
  );
  User.create(req.body, (err, createdUser) => {
    res.redirect("/");
  });
});

module.exports = router;