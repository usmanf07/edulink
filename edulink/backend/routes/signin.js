const router = require('express').Router();
let signin = require('../models/user.model');
const cors = require('cors')

const session = require('express-session');
router.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: false,
  }));


console.log("khugytfr");
// router.use(cors())

  router.route('/').get((req, res) => {
    console.log("Helloo");

    signin.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));

  });

  router.route('/').post(async(req, res) => {

    const{email, password}=req.body

    try{
        const check = await signin.findOne({email:email, password:password})
        // const check = signin.findOne({ $or: [{ email }, { password }] });
        console.log(email)
        // console.log(check)
        if(check._id)
        {
            // True condition to be logged in
            req.session.id = check.email;
            console.log(req.session.id);
            res.json( req.session.id)
        }
        else{
            res.json("notexists")
        }
    }
    catch(e){
        res.json("notexists")
        console.log(e);
    }


  });






module.exports = router;



