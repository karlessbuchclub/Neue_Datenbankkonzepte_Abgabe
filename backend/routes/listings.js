const express = require('express');
const router = express.Router();
const Review = require('../models/Review');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// Route zum Abrufen aller Reviews
router.get('/', async (req, res) => {
  try {
    const reviews = await Review.find();
    res.status(200).json(reviews);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Route zum Hinzufügen eines neuen Reviews
router.post('/', upload.fields([
  { name: 'imageFiles', maxCount: 10 },
  { name: 'videoFiles', maxCount: 10 },
  { name: 'documentFiles', maxCount: 10 },
]), async (req, res) => {
  const { caption, address, description, price, rating } = req.body;
  try {
    const newReview = new Review({
      user: "60d0fe4f5311236168a109ca", // Dummy-Benutzer-ID
      caption,
      address,
      description,
      price,
      rating,
      imageUrls: req.files.imageFiles ? req.files.imageFiles.map(file => file.filename) : [],
      videoUrls: req.files.videoFiles ? req.files.videoFiles.map(file => file.filename) : [],
      documentUrls: req.files.documentFiles ? req.files.documentFiles.map(file => file.filename) : [],
    });
    await newReview.save();
    res.status(201).send(newReview);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Route zum Löschen eines Reviews
router.delete('/:id', async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);
    if (!review) {
      return res.status(404).send('Review not found');
    }
    res.status(200).send('Review deleted');
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
