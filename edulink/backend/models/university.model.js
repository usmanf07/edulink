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
  },
  type:{
    type: String,
  },
  uniID: {
    type: String,
    required: true
  },
  scope:{

    type: String,
  },
  Namedisplay:{
    type: String,
    default: 'show'
  },
  Locationdisplay:{
    type: String,
    default: 'show'
  },
  premium:{
    type: String,
    default: 'false'
  },
  logo:{
    type: String,
    default: 'default'
  },
});

const University = mongoose.model('University', universitySchema);

module.exports = University;
