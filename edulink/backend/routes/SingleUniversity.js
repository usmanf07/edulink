const router = require('express').Router();
let Uni = require('../models/SingleUniversity.model');
let university = require('../models/university.model');
const Admission = require('../models/admission.model');
let UniLog =require('../models/InstituteLogin.model');
let Programs=require('../models/recentPrograms.model');
let Test =require ('../models/Test.model.js')

router.route('/').get((req, res) => {
    Uni.find()
      .then(institutes => res.json(institutes))
      .catch(err => res.status(400).json('Error: ' + err));
  });



  router.route('/getuniID/:name').get(async (req, res) => {

    const name = req.params.name;

     try {
    // Assuming you have a database model for universities
    const University_id = await Uni.findOne({ instituteName:name });

    if (!University_id) {
      return res.status(404).json({ message: 'University id not found' });
    }


    res.json(University_id.uniID);
  } catch (error) {
    console.error('Failed to get uniID:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
  });



router.route('/getType/getscope/:uniId').get(async (req, res) => {
  const { uniId } = req.params;

  try {
    // Assuming you have a database model for universities
    const University = await university.findOne({ uniID:uniId });

    if (!University) {
      return res.status(404).json({ message: 'University not found' });
    }

    // Extract the type and scope from the university object
    const { type, scope } = University;

    res.json({ type, scope });
  } catch (error) {
    console.error('Failed to get type and scope:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

//add apply program




  router.route('/insertprogram/addnewprogram')
  .post(async (req, res) => {
    const { uniID, program, lastApplyDate } = req.body;
    console.log(uniID);
    const updated = new Date();

    try {
      // Check if lastApplyDate is in the future
      const now = new Date();
      if (new Date(lastApplyDate) <= now) {
        return res.status(400).json({ message: "Last apply date must be in the future" });
      }

      // Create a new program and save it to the database
      const newProgram = new Programs({
        uniID: uniID,
        program: program,
        lastApplyDate: lastApplyDate,
        updated: updated
      });
      const savedProgram = await newProgram.save();

      res.status(200).json({ message: "Program saved successfully", program: savedProgram });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error saving program", error: err });
    }
  });


  //delete applications program
  router.route('/deleteprogram/:uniID/:program')
  .delete(async (req, res) => {
    const { uniID, program } = req.params;

    try {
      // Find and delete the program from the database
      const deletedProgram = await Programs.findOneAndDelete({ uniID, program });

      if (deletedProgram) {
        res.status(200).json({ message: "Program deleted successfully", program: deletedProgram });
      } else {
        res.status(404).json({ message: "Program not found" });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error deleting program", error: err });
    }
  });



router.route('/:name').get((req, res) => {
  const name = req.params.name;
  console.log(name);


   Uni.findOne({instituteName: name})
      .then(institute => res.json(institute))
      .catch(err => res.status(400).send('Error: ' + err));


  });


//update location
  router.route('/:name/location').put((req, res) => {
  const name = req.params.name;
  const location = req.body.location;

  Uni.findOneAndUpdate({instituteName: name}, {$set: {location: [location]}}, {new: true})
    .then(updatedInstitute => {
      if (!updatedInstitute) {
        return res.status(404).json({message: 'Institute not found'});
      }
      res.json(updatedInstitute);
    })
    .catch(err => res.status(400).json({message: 'Error updating institute', error: err}));
});



//update email
router.route('/institutes/:name/email-confirm').put(async (req, res) => {
  const name = req.params.name;
  const index = req.body.index;
  const newEmail = req.body.newEmail;
  console.log(newEmail);
  try {
    const uni = await Uni.findOne({instituteName: name});

    if (!uni) {
      return res.status(404).json({message: 'Institute not found'});
    }

    const updatedEmails = uni.emails.map((email, i) => {
      if (i == index) {

        return newEmail;
      } else {
        console.log(email);
        return email;
      }
    });

    uni.emails = updatedEmails;

    const updatedInstitute = await uni.save();

    res.json(updatedInstitute);
  } catch (error) {
    console.error('Failed to update email:', error);
    res.status(400).json({message: 'Error updating email', error: error});
  }
});





 ///add a new picture in picture array

 router.route('/addImage/:name/:image').get((req, res) => {
  const name = req.params.name;
  const image = req.params.image;

  Uni.findOneAndUpdate(
    { instituteName: name },
    { $push: { images: image } },
    { new: true }
  )
    .then((institute) => {
      if (!institute) {
        return res.status(404).json({ message: "Institute not found" });
      }
      res.json("success");
    })
    .catch((err) => res.status(400).json({ message: err.message }));
});


    //Change Name


    router.route('/changename/:name/:changename').post((req, res) => {
      const name = req.params.name;
      const newName = req.params.changename;

      Uni.updateOne({ instituteName: name }, { instituteName: newName })
        .then(() => {
          university.updateMany({ name: name }, { name: newName })
            .then(() => {
              UniLog.updateMany({ instituteName: name }, { instituteName: newName })
                .then(() => res.json('Institute name updated successfully!'))
                .catch(err => res.status(400).send('Error: ' + err));
            })
            .catch(err => res.status(400).send('Error: ' + err));
        })
        .catch(err => res.status(400).send('Error: ' + err));
    });


//change description

router.route('/changedescription/:name').post((req, res) => {
  const name = req.params.name;
  const newDescription = req.body.description;

  Uni.updateOne({ instituteName: name }, { description: newDescription })

        .then(() => res.json('Description updated successfully!'))
        .catch(err => res.status(400).send('Error: ' + err));

});
















  //add a new program
router.route('/addProgram/:name/:program').post((req, res) => {
  const name = req.params.name;
  const prog =req.params.program;
  Uni.findOne({ instituteName: name })
    .then((institute) => {
      const newProgram = {
        name: prog

      };
      institute.programs.push(newProgram);
      institute
        .save()
        .then(() => res.json('Program added to institute!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch((err) => res.status(400).send('Error: ' + err));
});

router.route('/:name/programs/:programName/domains/:newDomain').get( (req, res) => {
  const name = req.params.name;
  const programName = req.params.programName;
  const newDomain = req.params.newDomain;

  Uni.updateOne(
    { instituteName: name, 'programs.name': programName },
    { $push: { 'programs.$.domains.0': newDomain } }
  )
  .then(() => res.json('Domain added to program.'))
  .catch(err => res.status(400).json('Error: ' + err));
});



  //setBigPicture

  router.route('/upload-big-picture/:instituteName').post((req, res) => {
    const instituteName = req.params.instituteName;
    const bigPicture = req.body.back;

    Uni.findOneAndUpdate({ instituteName: instituteName }, { bigPicture: bigPicture })
      .then(() => {
        university.findOneAndUpdate({ name: instituteName }, { imageName: bigPicture })
          .then(() => res.json('Big picture uploaded.'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });


  router.route('/getprograms/:uniID')
  .get(async (req, res) => {
    const uniID = req.params.uniID;

    try {
      const programs = await Programs.find({ uniID: uniID }).exec();

      if (programs.length === 0) {
        return res.status(404).json({ message: "Program not found" });
      }

      res.status(200).json(programs);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error retrieving programs", error: err });
    }
  });



  router.route('/delete').delete((req, res) => {
    const name = req.body.name;
    Uni.findByIdAndDelete(name)
      .then(() => res.json('Institute deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
  });

  router.route('/addtest/addnewtest').post(async (req, res) => {
    const { uniid, questions } = req.body;

    try {
      const test = new Test({ uniid, questions });
      const savedTest = await test.save();

      res.json(savedTest);
    } catch (error) {
      console.error('Failed to add test:', error);
      res.status(400).json({ message: 'Error adding test', error: error });
    }
  });



  ///show test

  router.route('/gettext').post(async (req, res) => {
    const { uniid, index } = req.body;

    try {
      const tests = await Test.find({ uniid });

      if (index >= 0 && index < tests.length) {
        const test = tests[index];
        const questions = test.questions;
        res.json({ questions });
      } else {
        res.status(404).json({ message: 'Test not found' });
      }
    } catch (error) {
      console.error('Failed to retrieve test:', error);
      res.status(400).json({ message: 'Error retrieving test', error: error });
    }
  });


  router.route('/tests/total/:uniid').get(async (req, res) => {
    const uniid = req.params.uniid; // Extract the university ID from the route parameter

    try {
      const totalTests = await Test.countDocuments({ uniid });

      res.json({ totalTests });
    } catch (error) {
      console.error('Failed to get total tests:', error);
      res.status(400).json({ message: 'Error getting total tests', error: error });
    }
  });



  router.route('/add').post((req, res) => {
    const { instituteType,instituteName, bigPicture, description, admissionsOpen, images, reviews, programs ,location,inquiries,emails,relatedInstitutes, googlemap} = req.body;
    const institute = new Uni({
      instituteType,
      instituteName,
      bigPicture,
      description,
      admissionsOpen,
      images,
      reviews,
      programs,
      location,
      inquiries,
      emails,
      relatedInstitutes,
      googlemap
    });

    const name = instituteName;
    const address = location[0];
    const imageName = bigPicture;
    const type = instituteType;

    const newUser = new university({name,address,imageName,type});

    // institute.save()
    //   .then(() => res.json('Institute added!'))
    //   .catch(err => res.status(400).json('Error: ' + err));


    // newUser.save()
    //   .then(() => res.json('New University added!'))
    //   .catch(err => res.status(400).json('Error: ' + err));

      Promise.all([institute.save(), newUser.save()])
    .then(() => res.json('Institute and New University added!'))
    .catch(err => res.status(400).json('Error: ' + err));


  });





module.exports = router;



