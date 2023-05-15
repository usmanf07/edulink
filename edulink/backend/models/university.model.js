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
  Namedisplay:{
    type: String,
    default: 'show'
  },
  Locationdisplay:{
    type: String,
    default: 'show'
  },
 
});

const University = mongoose.model('University', universitySchema);

module.exports = University;
