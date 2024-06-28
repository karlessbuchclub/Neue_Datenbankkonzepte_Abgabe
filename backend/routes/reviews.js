const express = require('express');
const router = express.Router();
const Review = require('../models/Review');
const multer = require('multer');
const path = require('path');

// Legen Sie den Speicherort und die Dateinamenskonventionen fest
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  }
});

const upload = multer({ storage: storage });

// Route zum Erstellen einer Bewertung mit Datei-Uploads
router.post('/', upload.array('media'), async (req, res) => {
  const { user, content } = req.body;
  const media = req.files.map(file => ({
    type: file.mimetype.split('/')[0], // Beispiel: 'image', 'video'
    url: `/uploads/${file.filename}`,
    description: file.originalname
  }));

  try {
    const review = new Review({ user, content, media });
    await review.save();
    res.status(201).send(review);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Route zum Abrufen aller Bewertungen
router.get('/', async (req, res) => {
  try {
    const reviews = await Review.find().populate('user');
    res.send(reviews);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
