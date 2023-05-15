const router = require('express').Router();
let Uni = require('../models/SingleUniversity.model');
let university = require('../models/university.model');
const Admission = require('../models/admission.model');
let UniLog =require('../models/InstituteLogin.model');
let Programs=require('../models/recentPrograms.model');

router.route('/').get((req, res) => {
    Uni.find()
      .then(institutes => res.json(institutes))
      .catch(err => res.status(400).json('Error: ' + err));
  });


//add apply program


  router.route('/insertprogram/addnewprogram')
  .post(async (req, res) => {
    const { uniID, program, lastApplyDate } = req.body;

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

  router.route('/add').post((req, res) => {
    const { instituteName, bigPicture, description, admissionsOpen, images, reviews, programs ,location,inquiries,emails,relatedInstitutes, googlemap} = req.body;
    const institute = new Uni({
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

    const newUser = new university({name,address,imageName});

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



