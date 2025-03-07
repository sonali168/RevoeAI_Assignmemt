const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const sheetRoutes = require('./routes/sheetRoutes');

dotenv.config(); 

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); 


if (!process.env.MONGO_URI) {
  console.error('Error: MONGO_URI is not defined in .env file');
  process.exit(1);
}

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(' MongoDB Connected'))
  .catch((err) => {
    console.error(' DB Connection Error:', err.message);
    process.exit(1); 
  });

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/google-sheets', sheetRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('HR Dashboard Backend is Running ');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(` Server running on port ${PORT}`));
