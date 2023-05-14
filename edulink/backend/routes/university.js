const router = require('express').Router();
let Uni = require('../models/university.model');
let RecentProgram = require('../models/recentPrograms.model');

let UniLog =require('../models/InstituteLogin.model')
let SingleUni = require('../models/SingleUniversity.model');
const Admission = require('../models/admission.model');
  router.route('/').get((req, res) => {

    Uni.find()
      .then(users => res.json(users))
      .catch(err => res.status(400).json('Error: ' + err));
  });

  router.route('/delete').delete((req, res) => {
    if (!req.body) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    const query = req.body;

    Uni.deleteOne(query)
      .then(result => {
        if (result.deletedCount === 0) {
          res.status(404).json({ message: 'Document not found' });
        } else {
          res.json({ message: 'Document deleted successfully' });
        }
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });




  router.route('/signin')
  .post(async (req, res) => {
    const name = req.body.name;
    const password = req.body.password;

    try {
      // Check if institute exists with provided email and password
      const result = await UniLog.findOne({ instituteName: name, password: password });

      if (result) {
        // Institute exists with provided email and password
        res.status(200).json({ message: result });
      } else {
        // Institute doesn't exist with provided email and password
        res.status(401).json({ message: "Invalid name or password" });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error while checking institute credentials" });
    }
  });

  //add Oopen addmission into admission schema

  router.route('/admission').post((req, res) => {
    const { universityName, programName, deadline } = req.body;

    const admission = new Admission({ universityName, programName, deadline });

    admission.save()
      .then(() => res.json('Admission added!'))
      .catch(err => res.status(400).json('Error: ' + err));
  });





  //display admission by university name

router.route('/admissions/:name').get((req, res) => {
  const universityName = req.params.name;
  console.log(universityName);
  Admission.find({ universityName })
    .then(admissions => res.json(admissions))
    .catch(err => res.status(400).json('Error: ' + err));
});



  router.route('/signup')
  .post(async (req, res) => {
    const instituteName = req.body.instituteName;
    const email = req.body.email;
    const password = req.body.password;




    try {
      // Check if institute   already exists
      const result = await UniLog.findOne({ instituteName: instituteName });

      if (!result) {
        // Institute doesn't exist, so create new institute and add name to university and single university models
        const newInstitute = new UniLog({
          instituteName: instituteName,
          email:email,
          password:password

        });

        await newInstitute.save();

        const name = instituteName;
        const address = "default";
        const imageName = "default";

        const newUser = new Uni({name,address,imageName});


        newUser.save();

        const newSingleUniversity = new SingleUni({
          instituteName: instituteName,
          emails: []

        });
        newSingleUniversity.emails.push(email);
        await newSingleUniversity.save();
        res.status(200).json({ message: "Signed Up Successfully" });
      }
      else
      {
        res.status(500).json({ message: "Data already exists" });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err });
    }
  });





  router.route('/add').post((req, res) => {

    if (!req.body) {
      // If any of the required fields are missing, return an error response
      return res.status(400).json({ message: 'Missing required fields' });
    }
    const name = req.body.name;
    const address = req.body.address;
    const imageName = req.body.imageName;

    const newUser = new Uni({name,address,imageName});


    newUser.save()
      .then(() => res.json('New University added!'))
      .catch(err => res.status(400).json('Error: ' + err));


  });


  router.route('/recent-programs').get(async (req, res) => {
    try {
      const recentPrograms = await RecentProgram.find();
      const results = [];
      for (const program of recentPrograms) {
        const university = await Uni.findById(program.uniID);
        if(university == null) continue;  
        
        const programWithUniversity = {
          uniID: university._id,
          uniName: university.name,
          logo: university.imageName,
          program: program.program,
          lastApplyDate: program.lastApplyDate,
          updated: program.updated
        };
        results.push(programWithUniversity);
      }
      res.json(results);
    } catch (error) {
      console.error('Failed to retrieve recent programs:', error);
      res.status(500).json({ error: 'Failed to retrieve recent programs' });
    }
  });
  
  

module.exports = router;



