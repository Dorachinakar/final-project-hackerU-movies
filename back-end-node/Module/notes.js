const Joi = require("joi");
const mongoose = require("mongoose");
const _ = require("lodash");

const noteSchema = new mongoose.Schema({
  noteName: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
  },
  noteDescription: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 1024,
  },
  noteId: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 99999999999,
    unique: true,
  },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const Note = mongoose.model("Note", noteSchema);

function validateNote(note) {
  const schema = Joi.object({
    noteName: Joi.string().min(2).max(50).required(),
    noteDescription: Joi.string().min(2).max(1024).required(),
  });

  return schema.validate(note);
}

async function generateNoteId(Note) {
  while (true) {
    let randomNumber = _.random(1000, 999999);
    let note = await Note.findOne({ noteId: randomNumber });
    if (!note) return String(randomNumber);
  }
}

exports.Note = Note;
exports.validateNote = validateNote;
exports.generateNoteId = generateNoteId;
