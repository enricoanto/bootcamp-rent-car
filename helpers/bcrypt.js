const bcrypt = require("bcrypt");

const hashPassword = (payload) => {
  const hash = bcrypt.hashSync(payload, 10);
  return hash;
};

const comparePassword = (payload, compare) => {
  return bcrypt.compareSync(payload, compare);
};

module.exports = { hashPassword, comparePassword };
