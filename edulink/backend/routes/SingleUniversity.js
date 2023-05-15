const router = require('express').Router();
let Uni = require('../models/SingleUniversity.model');
let university = require('../models/university.model');
const Admission = require('../models/admission.model');
let UniLog =require('../models/InstituteLogin.model')


router.route('/').get((req, res) => {
    Uni.find()
      .then(institutes => res.json(institutes))
      .catch(err => res.status(400).json('Error: ' + err));
  });

router.route('/:name').get((req, res) => {
  const name = req.params.name;
  console.log(name);


   Uni.findOne({instituteName: name})
      .then(institute => res.json(institute))
      .catch(err => res.status(400).send('Error: ' + err));


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


  router.route('/delete').delete((req, res) => {
    const name = req.body.name;
    Uni.findByIdAndDelete(name)
      .then(() => res.json('Institute deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
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



