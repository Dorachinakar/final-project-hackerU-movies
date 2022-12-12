const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  let token =
    req.body.token ||
    req.params.token ||
    req.query.token ||
    req.headers["x-access-token"] ||
    req.headers["authorization"];
  if (!token) {
    return res.status(401).send("A token is  a required for authentication");
  }
  console.log("token beare is : ", token);
  if (token.split(" ").length > 1) token = token.split(" ")[1];
  try {
    const decoded = jwt.verify(token, "mySecretKey");
    req.user_id = decoded.user_id;
  } catch (err) {
    return res.status(401).send("the token u send is invalid token");
  }
  return next();
};
module.exports = verifyToken;
