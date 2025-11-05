const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const laptopRoutes = require('./routes/laptopRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

app.use(cors());
app.use(express.json());

const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/laptopcatalog';

mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('Connection error:', err));

app.use('/api', laptopRoutes);
app.use('/api', authRoutes);

const PORT = process.env.PORT || 7000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
