const User = require("../models/user.model");
const validateUser = require("../validations/user.validator");

const registerUser = async (req, res) => {
  const { error, value } = validateUser(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    const user = new User(value);
    await user.save();
    res.status(200).json(user);
  } catch (err) {
    if (err.code === 11000) {
      return res
        .status(409)
        .json({
          message: "Failed to create new user",
          reason: "Already Exists in DB",
        });
    }
    res.status(500).json({ message: "Internal Server Error", error: err });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    if (users.length === 0) {
      return res.status(404).json({ message: "No Users found" });
    }
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error", error: err });
  }
};

const getUserByUsername = async (req, res) => {
  const { username } = req.params;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found!", username });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error", error: err });
  }
};

module.exports = { registerUser, getAllUsers, getUserByUsername };
