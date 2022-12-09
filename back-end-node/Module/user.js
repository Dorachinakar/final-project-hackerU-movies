const mongoose = require("mongoose");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    firstName: { type: String, required: "The field first name is a required field!" },
    lastName: { type: String, required: "The field last name is a required field!" },
    email: { type: String, required: "The field email is a required field!", unique: true },
    phone: { type: String, required: "The field phone is a required field!" },
    password: { type: String, required: "The field password is a required field!" },
    favorite: { type: [String] },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

userSchema.methods.userValidate = function () {
  const userValidate = Joi.object({
    firstName: Joi.string().required().min(2).max(30),
    lastName: Joi.string().required().min(2).max(50),
    email: Joi.string().email({ tlds: { allow: false } }),
    password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
    favorite: Joi.required(),
    phone: Joi.string().required(),
  });
  return userValidate;
};
userSchema.methods.hashPassword = async function () {
  this.password = await bcrypt.hash(this.password, 8);
};

module.exports = mongoose.model("User", userSchema, "users");