const express = require('express');
const router = express.Router();
const { createProject, getTeamProjects } = require('../controllers/projectController');
const { authMiddleware } = require('../middlewares/authMiddleware');

router.post('/',createProject);
router.get('/team/:teamId',authMiddleware,getTeamProjects);

module.exports = router;