const jwt = require("jsonwebtoken");

function getNewToken(user) {
  return jwt.sign({ payload: user }, config.jwtKey, { expiresIn: "120m" });
  }

module.exports = {
  getNewToken,
};
