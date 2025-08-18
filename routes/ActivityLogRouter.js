const express = require("express");
const router = express.Router();

const {authMiddleware , rolecheck } = require("../middlewares/authMiddleware");
const {getLogsforProject} = require("../controllers/activityController");

router.get("/project/:projectId",authMiddleware,rolecheck("Admin","Project Manager", "TeamMember"), getLogsforProject);

module.exports = router;