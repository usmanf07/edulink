const router = require('express').Router();
let Uni = require('../models/university.model');


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
module.exports = router;



