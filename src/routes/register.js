const express = require('express');
const bcrypt = require('bcryptjs');
const Student = require('../models/student');
const Image = require('../models/image');
const { generateQRCode } = require('../utils/qrGenerator');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(__dirname, '../../uploads');
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    // Use enrollment number to make truly unique as well
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

// Unified registration endpoint: user info + reference image (multipart/form-data)
router.post('/register', upload.single('image'), async (req, res) => {
  try {
    // User fields in req.body
    const { name, enrollmentNumber, semester, degreeBranch, bloodGroup, email, password, role } = req.body;
    if (!name || !enrollmentNumber || !semester || !degreeBranch || !bloodGroup || !email || !password || !req.file) {
      return res.status(400).json({ msg: 'All fields including reference image are required.' });
    }
    let existing = await Student.findOne({ $or: [{ email }, { enrollmentNumber }] });
    if (existing) return res.status(409).json({ msg: 'User already exists.' });
    const passwordHash = await bcrypt.hash(password, 12);
    // Save image record
    const imgDoc = new Image({
      imgPath: req.file.path
    });
    await imgDoc.save();
    // Create student/admin record
    const student = new Student({
      name,
      enrollmentNumber,
      semester,
      degreeBranch,
      bloodGroup,
      email,
      passwordHash,
      imageId: imgDoc._id, // reference
      role: role === 'admin' ? 'admin' : 'student'
    });
    await student.save();
    imgDoc.studentId = student._id;
    await imgDoc.save();
    // Generate unique QR code encoding type/id (not raw PII)
    const qrData = { type: student.role, id: student._id };
    const qrString = JSON.stringify(qrData);
    const qrUrl = await generateQRCode(qrString);
    student.qrCode = qrUrl;
    await student.save();
    res.status(201).json({ msg: 'Registration successful.', qr: qrUrl });
  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
});

module.exports = router;

