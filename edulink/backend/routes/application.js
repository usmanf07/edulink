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
  
  
  router.route('/updateStatus/:email/:status/:uniID').post(async (req, res) => {
    try {
      const { email, status, uniID } = req.params;
  
      // Check if uniID and email match
      const application = await Application.findOne({ studentEmail: email, uniID: uniID });
      if (!application) {
        return res.status(404).json({ message: 'Application not found' });
      }
  
      // Update the application status for the given email and uniID
      await Application.updateOne({ studentEmail: email, uniID: uniID }, { $set: { applicationStatus: status } });
  
      // Return a success response
      return res.status(200).json({ message: 'Application status updated successfully' });
    } catch (error) {
      console.error('Error updating application status:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  });

  router.route('/:email').delete( (req, res) => {
    const email = req.params.email;
  console.log(email);
    // Perform a database query to delete the application with the given ID
    Application.deleteMany({studentEmail:email})
    .then((deletedApplication) => {
      if (!deletedApplication) {
        res.status(404).json({ error: 'Application not found' });
      } else {
        res.json({ message: 'Application deleted successfully' });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: 'Failed to delete the application' });
    });
  });
  

  router.route('/:id').delete( (req, res) => {
    const id = req.params.id;
  console.log(id);
    // Perform a database query to delete the application with the given ID
    Application.findByIdAndDelete(id)
    .then((deletedApplication) => {
      if (!deletedApplication) {
        res.status(404).json({ error: 'Application not found' });
      } else {
        res.json({ message: 'Application deleted successfully' });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: 'Failed to delete the application' });
    });
  });
  
  router.route('/:email').get(async (req, res) => {
    try {
      // Get the email from the user's cookie
      const userEmail = req.params.email;
      
      // Find all applications for the user with the given email
      const applications = await Application.find({ studentEmail: userEmail }).exec();
      
      // Check if any applications were found
      if (applications.length === 0) {
        return res.status(404).json({ message: 'No applications found for this user' });
      }
      
      const results = [];
      
      for (const app of applications) {
        const university = await Uni.findOne({uniID: app.uniID});
        if(university == null) continue;  
        
        const uniDetails = {
          uniName: university.name,
          logo: university.logo,
        };
        
        const applicationWithDetails = {
          ...app.toObject(),
          result: app.result,
          ...uniDetails,
        };
        
        results.push(applicationWithDetails);
      }
      
      return res.status(200).json(results);
    } catch (error) {
      console.error('Error getting applications:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  });



  router.route('/FetchStudents/:id').get(async (req, res) => {
    try {
    
      const uniid = req.params.id;
      
      // const university = await Uni.findOne({uniID: app.uniID});
      
      console.log(uniid);
      const applications = await Application.find({ uniID: uniid });
      
      // Check if any applications were found
      if (applications.length === 0) {
        return res.json('No applications found for this user');
      }
     
      console.log(applications);
      return res.json(applications);
    } catch (error) {
      console.error('Error getting applications:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  });





  router.route('/').get(async (req, res) => {
    try {
      const applications = await Application.find();
      
      // Check if any applications were found
      if (applications.length === 0) {
        return res.status(404).json({ message: 'No applications found for this user' });
      }
    
      
      return res.status(200).json(applications);
    } catch (error) {
      console.error('Error getting applications:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  });
  
  
  module.exports = router;

