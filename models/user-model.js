const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  profileUrl: String,
  email: String,
});

const User = mongoose.model("user", userSchema);

module.exports = User;