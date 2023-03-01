const express = require("express");
const _ = require("lodash");
const { Note, validateNote, generateNoteId } = require("../Module/notes");
const auth = require("../auth/auth");
const router = express.Router();
const User = require("../Module/user");

router.get("/my-notes", auth, async (req, res) => {
  const notes = await Note.find({ user_id: req.user_id });
  res.send(notes);
});

router.delete("/delete/:id", auth, async (req, res) => {
  try {
    const note = await Note.findOneAndRemove({ _id: req.params.id }, { user_id: req.user_id });

    const user = await User.findOne({ _id: req.user_id });
    if (user) {
      const filteredNotes = user.notes.filter((n) => n._id.toString() !== req.params.id);
      user.notes = filteredNotes;
      try {
        await user.save();
      } catch (error) {
        console.error(error);
      }
    } else {
      return res.status(404).send("User not found");
    }
    res.status(200).send("Note deleted successfully");
  } catch (error) {
    console.error(error);
  }
});

router.put("/:id", auth, async (req, res) => {
  const { error } = validateNote(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let note = await Note.findOneAndUpdate({ _id: req.params.id, user_id: req.user_id }, req.body);
  if (!note) return res.status(404).send("The note with the given ID was not found.");

  note = await Note.findOne({ _id: req.params.id, user_id: req.user_id });
  res.send(note);
});

router.get("/:id", auth, async (req, res) => {
  const note = await Note.findOne({
    _id: req.params.id,
    user_id: req.user_id,
  });
  if (!note) return res.status(404).send("The note with the given ID was not found.");
  res.send(note);
});

router.post("/", auth, async (req, res) => {
  const { error } = validateNote(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let note = new Note({
    noteName: req.body.noteName,
    noteDescription: req.body.noteDescription,
    noteId: await generateNoteId(Note),
    user_id: req.user_id,
  });
  post = await note.save();
  const user = await User.findOne({ _id: req.user_id });
  user.notes.push(note);
  await user.save();
  res.send(post);
});

module.exports = router;
