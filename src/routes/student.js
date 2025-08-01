const express = require('express');
const Student = require('../models/student');
const auth = require('../middlewares/auth');
const router = express.Router();

// Get current student's profile
router.get('/me', auth(), async (req, res) => {
  const user = await Student.findById(req.user.id).select('-passwordHash');
  if (!user) return res.status(404).json({ msg: 'User not found' });
  res.json(user);
});

// List all admin users (for frontend to enable admin targeting in complaints) 
router.get('/admins', auth(), async (req, res) => {
  const admins = await Student.find({ role: 'admin' }).select('_id name email enrollmentNumber');
  res.json(admins);
});

// Get student by enrollmentNumber (admin only)
router.get('/:enrollmentNumber', auth('admin'), async (req, res) => {
  const student = await Student.findOne({ enrollmentNumber: req.params.enrollmentNumber }).select('-passwordHash');
  if (!student) return res.status(404).json({ msg: 'Student not found' });
  res.json(student);
});

module.exports = router;

