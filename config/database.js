const mongoose = require('mongoose');
const dbConnect = async()=>
{
    await mongoose.connect(process.env.CONNECTION_URL).then(()=>
    {
        console.log("db connected");
    })
}

module.exports = dbConnect;