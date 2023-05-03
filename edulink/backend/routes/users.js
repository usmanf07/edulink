const router = require('express').Router();
let User = require('../models/user.model');

router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {

  if (!req.body) {
    // If any of the required fields are missing, return an error response
    return res.status(400).json({ message: 'Missing required fields' });
  }
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;

  const newUser = new User({username,password,email});


  newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
