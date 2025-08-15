const express = require("express");
const router = express.Router();

const { registerUser, loginUser, getcurrent } = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");

// Register
router.post("/register", registerUser);

// Login
router.post("/login", loginUser);

router.get("/info", authMiddleware, getcurrent);

module.exports = router;
