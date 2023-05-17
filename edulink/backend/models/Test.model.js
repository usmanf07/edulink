const mongoose = require('mongoose');

// Schema for the Option
const optionSchema = new mongoose.Schema({
  statement: {
    type: String,
    required: true
  }
});

// Schema for the Question
const questionSchema = new mongoose.Schema({
  statement: {
    type: String,
    required: true
  },
  options: [optionSchema]
});

// Schema for the Test
const testSchema = new mongoose.Schema({
  uniid: {
    type: String,
    required: true
  },
  questions: [questionSchema]
});

// Model for the Test collection
const Test = mongoose.model('Test', testSchema);

module.exports = Test;
