const express = require('express');
const auth = require('../middlewares/auth');
const Student = require('../models/student');
const Image = require('../models/image');
const multer = require('multer');
const path = require('path');
const { compareFaces } = require('../utils/faceRecognition');

const router = express.Router();

// Set up temporary storage for live images
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../../uploads/live'));
  },
  filename: function (req, file, cb) {
    cb(null, req.user.id + '-' + Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// POST /api/face/verify { multipart: image }, expects: student has a profile image
router.post('/verify', auth(), upload.single('image'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ msg: 'No live image provided.' });
    const student = await Student.findById(req.user.id);
    if (!student || !student.imageId) return res.status(400).json({ msg: 'Profile image not found.' });
    const refImage = await Image.findById(student.imageId);
    if (!refImage) return res.status(400).json({ msg: 'Reference image missing.' });
    const result = await compareFaces(refImage.imgPath, req.file.path);
    // Clean up live image after processing
    setTimeout(() => { try { require('fs').unlinkSync(req.file.path) } catch {} }, 10000);
    res.json(result);
  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
});

module.exports = router;

