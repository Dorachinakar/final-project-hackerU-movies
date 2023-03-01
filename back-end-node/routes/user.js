const User = require("../Module/user");
const { validateNotes } = require("../Module/notes");
const { Note } = require("../Module/notes");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const express = require("express"),
  app = express(),
  mongoose = require("mongoose");
const router = express.Router();
const auth = require("../auth/auth");
const {
  signUpUser,
  deleteFromFav,
  signInUser,
  addFavMovie,
  getAllFavorite,
} = require("../controllers/user");

const getNotes = async (notesArray) => {
  const notes = await Note.find({ noteId: { $in: notesArray } });
  return notes;
};

router.get("/notes", auth, async (req, res) => {
  if (!req.query.numbers) res.status(400).send("Missing numbers data");

  let data = {};
  data.notes = req.query.numbers.split(",");

  const notes = await getNotes(data.notes);
  res.send(notes);
});

router.patch("/notes", auth, async (req, res) => {
  const { error } = validateNotes(req.body);
  if (error) res.status(400).send(error.details[0].message);

  const notes = await getNotes(req.body.notes);
  if (notes.length != req.body.notes.length) res.status(400).send("Note numbers don't match");

  let user = await User.findById(req.user._id);
  user.notes = req.body.notes;
  user = await user.save();
  res.send(user);
});

router.post("/signup", (req, res) => {
  let { firstName, lastName, email, phone, password } = req.body;
  let user = { firstName, lastName, email, phone, password };
  signUpUser(user)
    .then((user) => res.status(200).json(user))
    .catch((err) => res.status(400).json(err));
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  signInUser({ email, password })
    .then((token) => res.status(200).json(token))
    .catch((err) => res.status(400).send(err));
});
router.post("/favorite", auth, async (req, res) => {
  const title = req.body;
  addFavMovie(Object.keys(title)[0], req.user_id)
    .then((user) => res.status(200).json(user))
    .catch((err) => res.status(400).send(err));
});
router.get("/getallfavorite", auth, async (req, res) => {
  getAllFavorite(req.user_id)
    .then((user) => res.status(200).json(user))
    .catch((err) => res.status(400).send(err));
});
router.patch("/delete", auth, async (req, res) => {
  const title = req.body;
  deleteFromFav(req.user_id, Object.keys(title)[0])
    .then((user) => res.status(200).json(user))
    .catch((err) => res.status(400).send(err));
});

module.exports = router;
