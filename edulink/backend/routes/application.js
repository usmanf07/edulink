const router = require('express').Router();
let Application = require('../models/applications.model');
let Uni = require('../models/university.model');
const UserProfile = require('../models/userProfile.model');

router.route('/').post(async (req, res) => {
    
    try {
      // Get the email and other data for the new application from the request body
      const { email, status, appliedDate, additionalRequirements, appliedFor, otherInfo} = req.body;
      // Find the uni for the given uniID
      const uni = await Uni({ uniID: req.body.uniID })
      if (!uni) {
        return res.status(400).json({ message: 'University not found' });
      }
  
      // Create a new application document
      const application = new Application({
        studentEmail: email,
        applicationStatus: 'Submitted',
        applicationUpdated: new Date(),
        appliedDate: new Date(),
        additionalRequirements: req.body.additionalRequirements.join(','),
        appliedFor: req.body.appliedFor,
        otherInfo: req.body.otherInfo,
        uniID: req.body.uniID,
      });
  
      // Save the new application document
      await application.save();
  
      // Return a success response
      return res.status(201).json({ message: 'Application added successfully' });
    } catch (error) {
      console.error('Error adding application:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  });
  
  module.exports = router;

