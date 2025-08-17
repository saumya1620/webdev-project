const Project = require('../models/projectModel');
const mongoose = require('mongoose');

const createProject = async(req,res)=>{
    const {name, description, teamId} = req.body;

    if(!name || !teamId){
        return res.status(400).json({
            message: "Project name and team are required"
        })
    }
    try{
        const projectExists = await Project.findOne({name, team: teamId});
        if(projectExists){  
            return res.status(400).json({
                message: "Project with this name already exists in the team"
            });
        }
        const project = await Project.create({
            name,
            description,
            team: new mongoose.Types.ObjectId(teamId),
        });
        res.status(201).json({
            message: "Project created successfully",
            project
        })
    }catch(err){
        res.status(500).json({
            message: err.message
        });
    }
}

const getTeamProjects = async(req,res)=>{
    const{teamId} = req.params;
    try{
        const projects = await Project.find({team:teamId});
        res.status(200).json({
            projects
        })
    }catch(err){
        res.status(500).json({
            message: err.message
        })
    }
};

module.exports = {
    createProject,
    getTeamProjects
}