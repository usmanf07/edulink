const router = require('express').Router();
let Uni = require('../models/SingleUniversity.model');


router.route('/').get((req, res) => {
    Uni.find()
      .then(institutes => res.json(institutes))
      .catch(err => res.status(400).json('Error: ' + err));
  });

  router.route('/delete').delete((req, res) => {
    const name = req.body.name;
    Uni.findByIdAndDelete(name)
      .then(() => res.json('Institute deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
  });

  router.route('/add').post((req, res) => {
    const { instituteName, bigPicture, description, admissionsOpen, images, reviews, programs } = req.body;
    const institute = new Uni({
      instituteName,
      bigPicture,
      description,
      admissionsOpen,
      images,
      reviews,
      programs,
    });
    institute.save()
      .then(() => res.json('Institute added!'))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  
module.exports = router;


