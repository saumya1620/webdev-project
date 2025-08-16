const Team = require('../models/teamModel');
//import { parse } from './../node_modules/dotenv/lib/main.d';
const User = require('../models/userModel');
const Project = require('../models/projectModel');
const mongoose = require('mongoose');
// Create a new team
const createTeam = async(req, res)=>{
    const {name, creator,members,projects} = req.body;
    if(!name || !creator || !members || !projects){
        return res.status(400).json({messsage: "Please fill all the fields"});
    }
    try{
        const team = await Team.create({
            name,
            creator: mongoose.Types.ObjectId(creator),
            members: members.map(member => mongoose.Types.ObjectId(member)),
            projects: projects.map(project => mongoose.Types.ObjectId(project))
    });
     return res.status(201).json({
        message: "Team created successfully",
        team
     })
    }
    catch(err){
        return res.status(500).json({message: err.message});
    }
}

// Add members to team
const addMembers = async(req,res)=>{
    const {members} = req.body;
    const teamId = req.params.id;
    if(!teamId || !members){
        return res.status(400).json({message: "Please select the team and members"})
    }
    try{
        const team = await Team.findById(teamId);
        if(!team){
            return res.status(404).json({message: "Team not found"});
        }
        // Check if members are already in the team
        const existingMembers = team.members.map(member => member.toString());
        const newMembers = members.filter(member => !existingMembers.includes(member));
        if(newMembers.length === 0){
            return res.status(400).json({message: "All members are already in the team"});
        }
        // Add new members to the team
        if(newMembers.length > 0){
            const memberIds = members.map(member => mongoose.Types.ObjectId(member));
            team.members.push(...memberIds);
            await team.save();
            return res.status(200).json({
            message: "Members added successfully",
            team
        })
    }
}catch(err){
    return res.status(500).json({message: err.message});
}
}

module.exports = {
    createTeam,
    addMembers
}