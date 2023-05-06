const mongoose = require('mongoose');

const universitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  imageName: {
    type: String,
    required: true
  }
});

const University = mongoose.model('University', universitySchema);

module.exports = University;
