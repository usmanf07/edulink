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


const inquirySchema = new mongoose.Schema({
  helpline: { type: String },
  officialWebsite: { type: String },
  facebook:{type: String} ,
});

const instituteSchema = new mongoose.Schema({
  uniID:{type:String},
  instituteType: {type:String },
  instituteName: { type: String, required: true },
  bigPicture: { type: String ,default:null},
  description: { type: String, required: false },
  admissionsOpen: [admissionSchema],
  images: [{ type: String }],
  reviews: [reviewSchema],
  programs: [{ type: programSchema, required: false }],
  location: [{}],
  inquiries: [inquirySchema],
  emails: [{type: String}],
  relatedInstitutes: [{ type: String}],
  googlemap : {type: String},

});

const SingleInstitute = mongoose.model('Institute', instituteSchema);

module.exports = SingleInstitute;
