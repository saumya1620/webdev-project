const express = require("express");
const router = express.Router();

const { registerUser, loginUser, getcurrent } = require("../controllers/authController");
const { authMiddleware } = require("../middlewares/authMiddleware");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/info",  getcurrent);

module.exports = router;
