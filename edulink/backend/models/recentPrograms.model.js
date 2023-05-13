const mongoose = require('mongoose');

const recentProgramSchema = new mongoose.Schema({
  uniID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'University',
    required: true
  },
  program: {
    type: String,
    required: true
  },
  lastApplyDate: {
    type: Date,
    required: true
  },
  updated: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('RecentProgram', recentProgramSchema);
