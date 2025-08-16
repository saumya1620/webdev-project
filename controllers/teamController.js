const Team = require('../models/teamModel');
const User = require('../models/userModel');
const Project = require('../models/projectModel');
const mongoose = require('mongoose');
// CREATE TEAM
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



module.exports = {
    createTeam,
}