const mongoose = require('mongoose');

const recentProgramSchema = new mongoose.Schema({
  uniID: {
    type: String,
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
