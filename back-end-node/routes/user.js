const User = require("../Module/user");
const bcrypt = require("bcrypt");
const express = require("express"),
  app = express(),
  mongoose = require("mongoose");
const router = express.Router();
const auth = require("../auth/auth");

const { signUpUser, signInUser, addFavMovie, getAllFavorite } = require("../controllers/user");

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
// router.delete("/delete", auth, async (req, res) => {
//   deleteFromFav(req.user_id, fav)
//     .then((user) => res.status(200).json(user))
//     .catch((err) => res.status(400).send(err));
// });

module.exports = router;
