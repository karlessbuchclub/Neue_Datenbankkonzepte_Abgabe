const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
require('dotenv').config(); // Import dotenv to load environment variables

const app = express();

const authRoutes = require('./routes/auth');
const reviewRoutes = require('./routes/reviews');
const listingRoutes = require('./routes/listings');

app.use(cors());
app.use(bodyParser.json());

// Statische Dateien bereitstellen
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/auth', authRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/listings', listingRoutes);

// Verwenden der Umgebungsvariable für die MongoDB-Verbindung
const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/holidayhub';

mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
