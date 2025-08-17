const Team = require('../models/teamModel');
const mongoose = require('mongoose');

// Create a new team
const createTeam = async (req, res) => {
    const { name, creator, members = []} = req.body;
    if (!name || !creator) {
        return res.status(400).json({ message: "Please fill all the required fields" });
    }
    try {
        const team = await Team.create({
            name,
            creator: new mongoose.Types.ObjectId(creator),
            members: members.map(member => new mongoose.Types.ObjectId(member)),
        });
        return res.status(201).json({
            message: "Team created successfully",
            team
        });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

// Add members to team
const addMembers = async (req, res) => {
    const { members } = req.body;
    const teamId = req.params.id;
    if (!teamId || !Array.isArray(members) || members.length === 0) {
        return res.status(400).json({ message: "Please select the team and members" });
    }
    try {
        const team = await Team.findById(teamId);
        if (!team) {
            return res.status(404).json({ message: "Team not found" });
        }
        const existingMembers = team.members.map(member => member.toString());
        const newMembers = members.filter(member => !existingMembers.includes(member));
        team.members.push(...members);
        await team.save();
        return res.status(200).json({
            message: "Members added successfully",
            team
        });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

module.exports = {
    createTeam,
    addMembers
};
