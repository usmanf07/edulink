const router = require('express').Router();
let User = require('../models/user.model');
let UserProfile = require('../models/userProfile.model');
const axios = require('axios');
const multer = require('multer');
const path = require('path');
const bcrypt = require('bcrypt');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

router.route('/').post(upload.single('profileImage'), async (req, res) => {
  const { userName, email, password, phoneNumber, profileImage } = req.body;

  try {
    const check = await User.findOne({ email: email });
    if (check) {
      return res.json("exists");
    } else {
      
      const newUser = new User({
        username: userName,
        email: email,
        password: password,
      });

      const newUserProfile = new UserProfile({
        fullName: userName,
        email: email,
        phone: phoneNumber,
      });

      if (profileImage) {
        console.log(profileImage);
        const filename = `${Date.now()}.jpg`;

        // Download the profileImage from the URL
        const response = await axios.get(profileImage, {
          responseType: 'arraybuffer',
        });

        // Save the file to the server's "uploads" folder
        const filePath = path.join(__dirname, '..', 'uploads', filename);
        fs.writeFileSync(filePath, response.data);

        // Save the filename in the database
        newUserProfile.avatar = filename;
      }

      // Save the new user and user profile
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