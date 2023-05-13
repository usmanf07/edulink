const router = require('express').Router();
let signin = require('../models/user.model');
const cors = require('cors')

const session = require('express-session');
router.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: false,
  }));


//console.log("khugytfr");
// router.use(cors())
  
  router.route('/').get((req, res) => {
    //console.log("Helloo");

    signin.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));

  });

  router.route('/').post(async(req, res) => {
    const { email, password } = req.body;
  
    try {
      const check = await signin.findOne({ email: email, password: password });
      if (check._id) {
        req.session.id = check.email;
        console.log(req.session.id);
        console.log(check.email);
        const responseObj = { sessionId: req.session.id, email: check.email };
        res.json(responseObj);
      } else {
        res.json("notexists");
      }
    } catch (e) {
      res.json("notexists");
      console.log(e);
    }
  });
  






module.exports = router;



