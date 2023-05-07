const mongoose = require('mongoose');

const programSchema = new mongoose.Schema({
  name: { type: String, required: true },
  domains: [{ type: [String], required: true }],
});

const admissionSchema = new mongoose.Schema({
  field: { type: String, required: true },
  deadline: { type: Date, required: true },
});

const reviewSchema = new mongoose.Schema({
  review: { type: String, required: true },
  reviewerName: { type: String, required: true },
});

const instituteSchema = new mongoose.Schema({
  instituteName: { type: String, required: true },
  bigPicture: { type: String },
  description: { type: String, required: true },
  admissionsOpen: [admissionSchema],
  images: [{ type: String }],
  reviews: [reviewSchema],
  programs: [{ type: programSchema, required: true }],
  location: [{}]
});

const SingleInstitute = mongoose.model('Institute', instituteSchema);

module.exports = SingleInstitute;
