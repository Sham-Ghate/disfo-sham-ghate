const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullName: { type: String, maxLength: 50, default: "" },
  username: { type: String, required: true, unique: true, maxLength: 25 },
  email: { type: String, required: true, unique: true },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
