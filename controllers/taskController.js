const Task = require("../models/taskModel");
const Project = require("../models/projectModel");
const { logAction } = require("./activityController")
const createTask = async(req,res)=>
{
    const {title , description , projectId , assignedUser } = req.body;
    if(!title || !projectId)
    {
        return res.status(400).json({message : "title and project ID required"});

    }
    const project = await Project.findById(projectId);
    if(!project)
    {
        return res.status(404).json({message : "project not found"});
    }
    const task = await Task.create({title, description , project:projectId , assignedUser:assignedUser || [],});
    await Project.findByIdAndUpdate(projectId , { $push : {tasks : task._id}});
    await logAction("Task Created", req.user._id ,projectId,task._id);
    return res.status(201).json({message : "created "});
};

const updateTaskStatus = async(req,res) =>
{
    const {taskId} = req.params;
    const {status} = req.body;
    if(!["To Do" , "In Progress" , "Completed"].includes(status))
    {
        return res.status(400).json({message : "Invalid status"});
    }

    const updatedTask = await Task.findByIdAndUpdate(
        taskId, 
        { status },
        { new : true }
    );
    if(!updatedTask)
    {
        return res.status(404).json({message : "task not found"});
    }
    if(updatedTask)
    {
        await logAction(`Task status changed to ${status}`, req.user._id,updatedTask.project,updatedTask._id)
    }
    return res.status(200).json({message : "task status updated" , task : updatedTask});
}

const assignTask = async(req,res)=>
{
    const {taskId} = req.params;
    const {userIds} = req.body;

    if(!userIds.length===0 || !Array.isArray(userIds))
    {
        return res.status(400).json({message : "provide users"});
    }
    const updatedTask = await Task.findOneAndUpdate(
        {_id :taskId},
        {$addToSet : { assignedUsers : {$each : userIds}}},
        {new : true}
    ).populate("assignedUsers", "firstName lastName emailId");

    if(!updatedTask)
    {
        return res.status(404).json({message : "task not found"});

    }
    if(updatedTask)
    {
        await logAction("user assigned to task",req.user._id,updatedTask.project,updatedTask._id)
    }
    return res.status(200).json({message : "user assigned" , task:updatedTask});


}

const getTasks = async(req,res)=>
{
    const {projectId} = req.params;
    const tasks = await Task.find({project:projectId}).populate("assignedUsers","firstName lastName emailId");
    return res.status(200).json({ tasks });
}

module.exports = { createTask , updateTaskStatus , assignTask , getTasks };