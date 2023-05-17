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

  const bcrypt = require('bcrypt');

  router.route('/').post(async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await signin.findOne({ email: email });
      if (user) {
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (isPasswordMatch) {
          req.session.id = user.email;
          console.log(req.session.id);
          console.log(user.email);
          const responseObj = { sessionId: req.session.id, email: user.email };
          res.json(responseObj);
        } else {
          res.json("notexists");
        }
      } else {
        res.json("notexists");
      }
    } catch (e) {
      res.json("notexists");
      console.log(e);
    }
  });
  






module.exports = router;



