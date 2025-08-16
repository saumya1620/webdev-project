const mongoose = require('mongoose');
const projectSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: String,
    team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', required: true }
}, 
{ timestamps: true });
module.exports = mongoose.model('Project', projectSchema);
