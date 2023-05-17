const mongoose = require('mongoose');

const educationSchema = new mongoose.Schema({
  instituteName: { type: String },
  degree: { type: String },
  startYear: { type: Number},
  endYear: { type: Number },
  result: { type: Number},
});

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  phone: { type: String  },
  fullName: { type: String},
  address: { type: String },
  avatar: {
    type: String,
  },
  profileSummary: { type: String},
  educationBackground: { type: [educationSchema] },
  admissionPreferences: { type: [String]},
});


module.exports = mongoose.model('UserProfile', userSchema);
