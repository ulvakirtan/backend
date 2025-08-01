const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  enrollmentNumber: {
    type: String,
    required: true,
    unique: true
  },
  semester: {
    type: Number,
    required: true
  },
  degreeBranch: {
    type: String,
    required: true
  },
  bloodGroup: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  passwordHash: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['student', 'admin'],
    default: 'student'
  },
  qrCode: {
    type: String
  },
  imageId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Image'
  }
}, { timestamps: true });

module.exports = mongoose.model('Student', StudentSchema);

