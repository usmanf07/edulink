const router = require('express').Router();
let Uni = require('../models/university.model');
let RecentProgram = require('../models/recentPrograms.model');
const nodemailer = require("nodemailer");
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

  router.route('/recent-programs/:id').get(async (req, res) => {

    const id = req.params.id;

    try {
      const recentPrograms = await RecentProgram.find({ uniID:id });
   
      console.log(recentPrograms);
      res.json(recentPrograms);
    } catch (error) {
      console.error('Failed to retrieve recent programs:', error);
      res.status(500).json({ error: 'Failed to retrieve recent programs' });
    }
  });


  router.route('/logo/:name').get((req, res) => {
    const universityName = req.params.name;
    //console.log(universityName);
    Admission.find({ universityName })
      .then(admissions => res.json(admissions))
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
        res.status(200).json({
          message: "Signin successful",
          id: result._id // Include the id of the institute in the response
        });
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
  //console.log(universityName);
  Admission.find({ universityName })
    .then(admissions => res.json(admissions))
    .catch(err => res.status(400).json('Error: ' + err));
});


  const multer = require('multer');

  // Set up multer storage for logo uploads
  const logoStorage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'logos/'); // Specify the destination folder for logo uploads
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const extension = file.originalname.split('.').pop(); // Get the file extension
      cb(null, file.fieldname + '-' + uniqueSuffix + '.' + extension); // Generate a unique filename with the original extension
    },
  });


  const logoUpload = multer({ storage: logoStorage });

  router.route('/signup').post(logoUpload.single('logoFile'), async (req, res) => {
    const instituteName = req.body.instituteName;
    const email = req.body.email;
    const password = req.body.password;
    const scope = req.body.scope;
    const type = req.body.type;

    const logoFile = req.file; // Get the uploaded logo file
    
    try {
      // Check if institute already exists
      const result = await UniLog.findOne({ instituteName: instituteName });
  
      if (!result) {
        // Institute doesn't exist, so create new institute and add name to university and single university models
        const newInstitute = new UniLog({
          instituteName: instituteName,
          email: email,
          password: password,
        });
  
        // Save the new UniLog and get its id
        const savedUniLog = await newInstitute.save();
        const uniLogId = savedUniLog._id;
  
        const name = instituteName;

        const address = 'default';
        const imageName = 'default'; // Store the filename in the database
       // console.log(logoFile.filename);


        // Create a new University document and set the uniID, scope, and type fields
        const newUniversity = new Uni({
          name,
          address,
          imageName,

          logo: logoFile.filename,
          uniID: uniLogId,
          scope,
          type,
        });


        const savedUniversity = await newUniversity.save();
  
        const newSingleUniversity = new SingleUni({
          uniID: uniLogId,
          instituteName: instituteName,
          emails: [email],

          googlemap: instituteName,

        });
  
        await newSingleUniversity.save();
        res.status(200).json({ message: 'Signed Up Successfully' });
      } else {
        res.status(500).json({ message: 'Data already exists' });
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
        const university = await Uni.findOne({uniID: program.uniID});
        if(university == null) continue;

        const programWithUniversity = {
          uniID: university.uniID,
          uniName: university.name,
          logo: university.logo,
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

  router.route('/updateDisplay').put(async (req, res) => {
    console.log("update");
    const updatedUniversities = req.body;

    try {

      console.log("updat2");
      for (const updatedUniversity of updatedUniversities) {

        const { name, display } = updatedUniversity;
        console.log(name + "," + display);
        await Uni.updateOne({ name: name }, { Namedisplay: display })
        // await Uni.findByIdAndUpdate(name, { display });
      }

      res.send(200);
    } catch (error) {
      console.error("Failed to update universities:", error);
      res.send(500);
    }
  });


  router.route('/updateLocationDisplay').put(async (req, res) => {
    const updatedUniversities = req.body;

    try {

      for (const updatedUniversity of updatedUniversities) {

        const { name, display } = updatedUniversity;
        console.log("kjhgfgh      " + name + "," + display);
        await Uni.updateOne({ address: name }, { Locationdisplay: display })
        // await Uni.findByIdAndUpdate(name, { display });
      }

      res.send(200);
    } catch (error) {
      console.error("Failed to update universities:", error);
      res.send(500);
    }
  });


  
  router.route('/getUniId/:name').get(async (req, res) => {
    try {
      const name1 = req.params.name;
      const id = await Uni.findOne({ name: name1 });

      console.log(id.uniID);

      
      return res.json(id.uniID);
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  });



  router.route('/sendmail').post((req, res) => {
    const { receiver, subject, message } = req.body;

    console.log(message);
    let smtpTransport = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        type: "OAuth2",
        user: "orthoimplantsgu@gmail.com",
        clientId: "420068824513-6cgvcp1360kvs9e6egpmeveqec43pjea.apps.googleusercontent.com",
        clientSecret: "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",
        refreshToken: "1//04AkSObuHvOfjCgYIARAAGAQSNwF-L9IrQzFrpRjJZVUIk1DEMKylV8qWO0ciwOypxMc5waYdPbBHHChEMUrvui8F3sPvAE55vHM"
      }
    });

    let messageTemplate = {
      to: receiver,
      subject: subject,
      text: message
    };

    smtpTransport.sendMail(messageTemplate, (err, info) => {
      if (err) {
        res.send(err);
      } else {
        smtpTransport.close();
        return res.json({
          status: "ok",
          msg: "Email sent"
        });
      }
    });
  });
module.exports = router;
