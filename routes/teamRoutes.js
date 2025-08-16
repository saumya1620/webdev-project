const express = require('express');
const router = express.Router();
const { createTeam, addMembers } = require('../controllers/teamController');


router.post('/teams', createTeam);
router.post('/teams/:id/members', addMembers);

module.exports = router;