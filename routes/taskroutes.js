const express = require("express");
const router = express.Router();

const {authMiddleware , rolecheck} = require("../middlewares/authMiddleware");
const {
    createTask , 
    updateTaskStatus , 
    assignTask , 
    getTasks,
    getStatus
} = require("../controllers/taskController");

router.post("/create" , authMiddleware , rolecheck("Admin" , "Project Manager"),createTask);
router.put("/:taskId/assign", authMiddleware , rolecheck("Admin","Project Manager"), assignTask);
router.get("/project/:projectId",authMiddleware,rolecheck("Admin" , "Project Manager" , "TeamMember"),getTasks);

router.post("/:taskId/status",authMiddleware,updateTaskStatus)
router.get("/:taskId/getstatus",authMiddleware,getStatus)

module.exports = router;