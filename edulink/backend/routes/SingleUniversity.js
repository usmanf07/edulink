const router = require('express').Router();
let Uni = require('../models/SingleUniversity.model');
let university = require('../models/university.model');



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



