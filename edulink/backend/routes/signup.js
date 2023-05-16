const router = require('express').Router();
let User = require('../models/user.model');
let UserProfile = require('../models/userProfile.model');
const cors = require('cors')

router.route('/').post(async (req, res) => {
    const { userName, email, password, phoneNumber } = req.body;
  
    try {
      const check = await User.findOne({ email: email });
      if (check) {
        res.json("exists");
      } else {
        const newUser = new User({
          username: userName,
          email: email,
          password: password
        });
  
        const newUserProfile = new UserProfile({
          fullName: userName,
          email: email,
          phone: phoneNumber
          // Add other fields as needed
        });
  
        await newUser.save();
        await newUserProfile.save();
  
        res.json("success");
      }
    } catch (e) {
      res.json("notexists");
      console.log(e);
    }
  });






module.exports = router;