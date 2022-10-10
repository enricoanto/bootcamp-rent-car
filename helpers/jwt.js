const jwt = require("jsonwebtoken");

const signToken = (payload) => {
  const token = jwt.sign(payload, process.env.SECRET);
  return token;
};

const verifyToken = (token) => {
  return jwt.verify(token, process.env.SECRET);
};

module.exports = { signToken, verifyToken };
