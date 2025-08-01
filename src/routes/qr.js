const express = require('express');
const auth = require('../middlewares/auth');
const Student = require('../models/student');
const { generateQRCode } = require('../utils/qrGenerator');
const router = express.Router();

// Get QR code for logged-in student (contains enrollment number for demo)
router.get('/me', auth(), async (req, res) => {
  const student = await Student.findById(req.user.id);
  if (!student) return res.status(404).json({ msg: 'Student not found' });
  const qrData = { id: student._id, enrollmentNumber: student.enrollmentNumber };
  const qrString = JSON.stringify(qrData);
  const qrUrl = await generateQRCode(qrString);
  res.json({ qr: qrUrl });
});

// Admin: get QR for a student by enrollment number
router.get('/:enrollmentNumber', auth('admin'), async (req, res) => {
  const student = await Student.findOne({ enrollmentNumber: req.params.enrollmentNumber });
  if (!student) return res.status(404).json({ msg: 'Student not found' });
  const qrData = { id: student._id, enrollmentNumber: student.enrollmentNumber };
  const qrString = JSON.stringify(qrData);
  const qrUrl = await generateQRCode(qrString);
  res.json({ qr: qrUrl });
});

// Download QR code for logged-in user as PNG
const Student = require('../models/student');

router.get('/me/download', auth(), async (req, res) => {
  const student = await Student.findById(req.user.id);
  if (!student) return res.status(404).json({ msg: 'User not found' });

  // Always generate the QR fresh for max security if needed
  const qrData = { type: student.role, id: student._id };
  const qrString = JSON.stringify(qrData);
  const qrUrl = await generateQRCode(qrString);

  const matches = qrUrl.match(/^data:([A-Za-z-+/]+);base64,(.+)$/);
  if (!matches || matches.length !== 3)
    return res.status(500).json({ msg: 'QR code format error' });

  const buffer = Buffer.from(matches[2], 'base64');
  res.setHeader('Content-Disposition', 'attachment; filename="my-campus-qr.png"');
  res.setHeader('Content-Type', 'image/png');
  res.send(buffer);
});

module.exports = router;

