const express = require('express');
const auth = require('../middlewares/auth');
const Alert = require('../models/alert');
const router = express.Router();

// Admin/Security: create alert (to all, to role, or specific users)
router.post('/', auth('admin'), async (req, res) => {
  const { title, message, target } = req.body;
  if (!title || !message) return res.status(400).json({ msg: 'Title and message required.' });
  const alert = new Alert({
    senderId: req.user.id,
    title,
    message,
    target: target || 'all'
  });
  await alert.save();
  // (Notify via websockets in real system)
  res.status(201).json({ msg: 'Alert sent.', alert });
});

// Get all alerts (filter target in future as needed)
router.get('/', auth(), async (req, res) => {
  const alerts = await Alert.find().sort({ createdAt: -1 });
  res.json(alerts);
});

module.exports = router;

