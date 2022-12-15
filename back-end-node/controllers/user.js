const User = require("../Module/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

function signUpUser(user) {
  return new Promise(async (resolve, reject) => {
    const newUser = new User(user);
    const { error, value } = newUser.userValidate().validate(user);
    if (error) reject(error);
    else {
      const regex = new RegExp(
        "^(?=.*?[A-Z])(?=.*?[a-z])(?=(.*?[0-9]){4})(?=.*?[#?!@$%^&*-]).{7,18}$"
      );
      let statusRegex = regex.test(newUser.password);
      if (statusRegex) {
        await newUser.hashPassword();
        newUser
          .save()
          .then((user) => resolve(user))
          .catch((err) => {
            if (err.message) {
              reject({
                details: [
                  {
                    message: "this email is allready in the system",
                  },
                ],
              });
            } else {
              reject(err);
            }
          });
      } else {
        reject({
          details: [
            {
              message:
                "password must includes small and camel letters,4 digits,length: 7 - 18, and one !@#$%^&*",
            },
          ],
        });
      }
    }
  });
}
function signInUser(user) {
  return new Promise(async (resolve, reject) => {
    const { email, password } = user;
    try {
      if (!(email && password)) {
        res.status(400).send("all input is required");
      }
      const loginByEmail = await User.findOne({ email });
      if (loginByEmail && (await bcrypt.compare(password, loginByEmail.password))) {
        const token = await createToken(loginByEmail);
        resolve(token);
      } else reject("Invalid Credentials  !! Check your email and password please!!");
    } catch (err) {
      reject(err);
    }
  });
}
const createToken = (user) => {
  return jwt.sign({ user_id: user._id, isAdmin: user.isAdmin }, "mySecretKey", {
    expiresIn: "31111m",
  });
};
function addFavMovie(card, userId) {
  return new Promise(async (resolve, reject) => {
    const user = await User.findById(userId);
    if (user) {
      user.favorite.push(card);
      user.save();
      resolve(card);
    } else {
      reject("no card to save");
    }
  });
}
function getAllFavorite(userId) {
  return new Promise(async (resolve, reject) => {
    const user = await User.findById(userId);
    if (user) {
      resolve(user.favorite);
    } else {
      reject("plz sign in first");
    }
  });
}

module.exports = {
  signUpUser,
  signInUser,
  createToken,
  addFavMovie,
  getAllFavorite,
};
