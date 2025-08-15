const mongoose = require('mongoose');
const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    status: { type: String, enum: ['To Do', 'In Progress', 'Completed'], default: 'To Do' },
    project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
    assignedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
}, 
{ timestamps: true });
module.exports = mongoose.model('Task', taskSchema);
