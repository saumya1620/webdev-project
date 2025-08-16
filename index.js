const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const teamRoutes = require('./routes/teamRoutes')

dotenv.config(); 

const app = express();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));


app.use(express.json());

app.use('/api/teams', teamRoutes);

app.get('/', (req, res) => {
  res.send('Server is running');
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`🚀 Server running on port ${process.env.PORT || 5000}`);
});
