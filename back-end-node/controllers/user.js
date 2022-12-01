const User = require("../Module/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
function signUpUser(user) {
  return new Promise(async (resolve, reject) => {
    const newUser = new User(user);
    const { error, value } = newUser.userValidate().validate(user);
    if (error) reject(error);
    else {
      await newUser.hashPassword();
      newUser
        .save()
        .then((user) => resolve(user))
        .catch((err) => reject(err));
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
      } else res.status(400).send("Invalid Credentials  !! Check your email and password please!!");
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

module.exports = {
  signUpUser,
  signInUser,
  createToken,
};
