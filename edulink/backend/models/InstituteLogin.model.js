const mongoose = require('mongoose');

const instituteLoginSchema = new mongoose.Schema({
  instituteName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

const InstituteLogin = mongoose.model('InstituteLogin', instituteLoginSchema);

module.exports = InstituteLogin;
