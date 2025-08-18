const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateToken");
const validator = require("validator");

const registerUser = async (req, res) => {
  const { firstName, lastName, emailId, password, role } = req.body;

  if (!firstName || !emailId || !password) {
    return res.status(400).json({ message: "Please add all mandatory fields" });
  }

  if (!validator.isEmail(emailId)) {
    return res.status(400).json({ message: "Please provide a correct email" });
  }

  if (!validator.isStrongPassword(password)) {
    return res.status(400).json({ message: "Please provide a strong password" });
  }

  try {
    const userExists = await User.findOne({ emailId });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      firstName,
      lastName,
      emailId,
      password: hashedPassword,
      role
    });

    const token = generateToken(newUser);

    return res.status(201).json({
      message: "User added successfully",
      token,
      newUser
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const loginUser = async (req, res) => {
  const { emailId, password } = req.body;

  if (!emailId || !password) {
    return res.status(400).json({ message: "Please add all details" });
  }

  try {
    const user = await User.findOne({ emailId });

    if (!user) {
      return res.status(400).json({ message: "No user found" });
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    const token = generateToken(user);

    return res.status(200).json({ message: "Logged in", token, user});
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};


const getcurrent = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("emailId");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ message: "Current user", data: user });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = { registerUser, loginUser, getcurrent };
