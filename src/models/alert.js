const mongoose = require('mongoose');

const AlertSchema = new mongoose.Schema({
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student', // May be admin or security
    required: true
  },
  title: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  target: {
    type: String, // 'all', 'students', 'admins', or comma-separated enrollmentNumbers/userIds for individuals/groups
    default: 'all'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Alert', AlertSchema);

