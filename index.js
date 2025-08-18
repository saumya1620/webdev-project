const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRegister = require('./routes/authRoutes');
const projectRoutes = require('./routes/projectRoutes');
const teamRoutes = require('./routes/teamRoutes');
const taskRoutes = require('./routes/taskroutes');
const activitylogs = require('./routes/ActivityLogRouter');

dotenv.config(); 

const app = express();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB Connection Error:', err));


app.use(express.json());

app.use('/api/user' , userRegister);
app.use('/api/teams', teamRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/tasks',taskRoutes);
app.use('/api/logs',activitylogs);


app.get('/', (req, res) => {
  res.send('Server is running');
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on port ${process.env.PORT || 5000}`);
});
