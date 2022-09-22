import mongoose from "mongoose";
const Joi = require("joi");
const bcrypt = require("bcrypt");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    firstName: { String, required: "The field first name is a required field!" },
    lastName: { String, required: "The field last name is a required field!" },
    email: { String, required: "The field email is a required field!", unique: true },
    phone: { String, required: "The field phone is a required field!" },
    password: { String, required: "The field password is a required field!" },
    favorite: [String],
    isAdmin: {
      Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

userSchema.methods.validateUser = function () {
  const userValidate = Joi.object({
    firstName: Joi.string().required("The field first name is a required field!").min(2).max(30),
    lastName: Joi.string().required("The field last name is a required field!").min(2).max(50),
    email: Joi.string().email({ tlds: { allow: false } }),
    password: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .required("The field password is a required field!"),
    repeat_password: Joi.ref("password").required("plz re enter your password!"),
    phone: Joi.string().required("The field phone is a required field!"),
  });
  return userValidate;
};
userSchema.methods.hashPassword = async function () {
  this.password = await bcrypt.hash(this.password, 8);
};

module.exports = mongoose.model("User", userSchema, "users");
