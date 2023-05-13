const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema({
    uniID: {
        type: String,
        required: true
        },

  studentEmail: {
    type: String,
    required: true
  },
  applicationStatus: {
    type: String,
    enum: ['Submitted', 'In Review', 'Revision Needed', 'Accepted', 'Rejected'],
    default: 'Submitted'
  },
  applicationUpdated: {
    type: Date,
    default: Date.now
  },
  appliedDate: {
    type: Date,
    default: Date.now
  },
  additionalRequirements: {
    type: String
  },
  appliedFor: {
    type: String,
    required: true
  },
  otherInfo: {
    type: String
  }
});

const Application = mongoose.model('Application', ApplicationSchema);

module.exports = Application;
