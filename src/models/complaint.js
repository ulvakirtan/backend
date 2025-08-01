const mongoose = require('mongoose');

const ComplaintSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  admins: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student' // storing admin IDs (role: admin)
  }],
  replies: [
    {
      adminId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
      message: { type: String },
      createdAt: { type: Date, default: Date.now }
    }
  ],
  status: {
    type: String,
    enum: ['open', 'resolved', 'inReview'],
    default: 'open'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Complaint', ComplaintSchema);

