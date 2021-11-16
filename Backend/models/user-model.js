const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  username: String,
  password: String,
  isAdmin: Boolean,
  // token: String,
}, { versionKey: false, toJSON: { virtuals: true }, id: false });

const UserModel = mongoose.model("UserModel", UserSchema, "users");

module.exports = UserModel;