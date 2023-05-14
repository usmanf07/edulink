const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const admissionSchema = new Schema({
  universityName: { type: String, required: true },
  programName: { type: String, required: true },
  deadline: { type: Date, required: true }
});

module.exports = mongoose.model('Admission', admissionSchema);
