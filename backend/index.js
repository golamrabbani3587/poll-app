require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Add CORS middleware to allow only requests from http://localhost:3000
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

// Middleware
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error('MongoDB connection error:', err));

// TODO: Add routes here
app.use('/api/users', require('./routes/user'));
app.use('/api/polls', require('./routes/poll'));
app.use('/api/votes', require('./routes/vote'));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 