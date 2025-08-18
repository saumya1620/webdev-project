const ActivityLog = require("../models/activityLogModel");

const logAction = async(action , userId , projectId , taskId =null) =>
{
    const log = new ActivityLog({
        action,
        user:userId,
        project:projectId,
        task : taskId,
    });

    await log.save();
    console.log("logged: ", action);

}

const getLogsforProject = async(req,res) =>
{
    const { projectId } = req.params;
    const logs = await ActivityLog.find({project:projectId})
    .populate("user","firstName lastName emailId role")
    .populate("task","title status")
    .sort({createdAt :-1});
    return res.status(200).json({message : "activity logs", logs})
}

module.exports = { logAction , getLogsforProject};