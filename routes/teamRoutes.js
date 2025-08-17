const express = require('express');
const router = express.Router();
const { createTeam, addMembers } = require('../controllers/teamController');
const { authMiddleware } = require('../middlewares/authMiddleware');


router.post('/create', authMiddleware,createTeam);
router.post('/:id/member',authMiddleware ,addMembers);

module.exports = router;