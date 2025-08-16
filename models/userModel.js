const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName : {type:String , required:true},
    emailId: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { 
        type: String, 
        enum: ['Admin', 'Project Manager', 'TeamMember'], 
        default: 'TeamMember' 
    }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);