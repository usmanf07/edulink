const router = require('express').Router();
let User = require('../models/userProfile.model');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads');
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname));
    },
  });
  
  const upload = multer({ storage: storage });

router.post('/upload', upload.single('avatar'), async (req, res) => {
try {
    const email  = req.body.email;
    console.log(email);
    const avatar = req.file.filename;
    const user = await User.findOneAndUpdate(
        { email },
        { avatar },
        { new: true }
      );
    res.json(user);
} catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server Error' });
}
});

router.route('/:email').get((req, res) => {
  User.findOne({ email: req.params.email })
    .then(user => {
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
        const { phone, fullName, address, avatar, profileSummary, educationBackground } = user;
      res.json({ phone, fullName, address, avatar, profileSummary, educationBackground });
    })
    .catch(err => res.status(400).json({ message: err.message }));
});

// const fs = require('fs');

// router.put('/:email/image', upload.single('file'), async (req, res) => {
//   const file = req.file;

//   if (!file) {
//     return res.status(400).json({ message: 'No file uploaded' });
//   }

//   const email = req.params.email;

//   try {
//     const buffer = fs.readFileSync(file.path);
//     const base64 = buffer.toString('base64');

//     const updatedUser = await User.findOneAndUpdate(
//       { email: email },
//       { image: base64 },
//       { new: true, upsert: true }
//     );

//     res.json(updatedUser);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });


  

// router.route('/add').post((req, res) => {
//     const email = "fatima"; // set the email
//     const phone = "1234567890"; // set the phone
//     const fullName = "Fatima Ahmed"; // set the full name
//     const address = "123 Main St, City, Country"; // set the address
//     const image = "https://example.com/image.jpg"; // set the image URL
//     const profileSummary = "I am a web developer with 5 years of experience."; // set the profile summary
//     const educationBackground = [
//       { instituteName: "University of ABC", degree: "Bachelor of Science", startYear: 2015, endYear: 2019, result: "3.8" },
//       { instituteName: "College of XYZ", degree: "Associate of Arts", startYear: 2013, endYear: 2015, result: "3.5" }
//     ]; // set the education background
  
//     User.create({ email, phone, fullName, address, image, profileSummary, educationBackground })
//       .then(() => res.json({ message: 'User added successfully' }))
//       .catch(err => res.status(400).json({ message: err.message }));
//   });

router.route('/:email').put(async (req, res) => {
    
    try {
      const email = req.params.email;
      const updatedUser = await User.findOneAndUpdate({ email }, req.body, { new: true });
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.json(updatedUser);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  
  router.route('/:email/Institute/:instituteName').put(async (req, res) => {
    try {
      const { email, instituteName } = req.params;
      const updatedEducation = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      const instituteIndex = user.educationBackground.findIndex(edu => edu.instituteName === instituteName);
      
      if (instituteIndex === -1) {
        user.educationBackground.push(updatedEducation);
        await user.save();
        return res.json({ message: 'New institute added successfully' });
      }
      user.educationBackground[instituteIndex] = updatedEducation;
      await user.save();
      res.json({ message: 'Education updated successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
  router.route('http://localhost:8000/users/:email/Institute/:instituteName').delete(async (req, res) => {
    try {
      const { email, instituteName } = req.params;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      user.educationBackground = user.educationBackground.filter(edu => edu.instituteName !== instituteName);
      await user.save();
      res.json({ message: 'Education deleted successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
  
  
  
  
module.exports = router;
