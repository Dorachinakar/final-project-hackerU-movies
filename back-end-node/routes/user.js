const User = require("../Module/user");
const bcrypt = require("bcrypt");
const express = require("express"),
  app = express(),
  mongoose = require("mongoose");
const router = express.Router();
const auth = require("../auth/auth");

const { signUpUser, signInUser, createToken } = require("../controllers/user");

router.post("/signup", auth, (req, res) => {
  let { firstName, lastName, email, phone, password, favorite } = req.body;
  let user = { firstName, lastName, email, phone, password, favorite };
  signUpUser(user)
    .then((user) => res.status(200).json(user))
    .catch((err) => res.status(400).json(err));
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  signInUser({ email, password })
    .then((token) => res.status(200).json(token))
    .catch((err) => res.status(401).json(err));
});

module.exports = router;
