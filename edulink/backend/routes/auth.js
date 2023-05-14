const express = require('express');
const router = express.Router();
const dotenv = require('dotenv');
const twilio = require('twilio');
const jwt = require('jsonwebtoken');
dotenv.config({ path: './twilio.env' });

router.route('/send-otp').post( async (req, res) => {
  try {
    const { phoneNumber } = req.body;
    console.log(phoneNumber);
    // Generate a random 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Create a JWT token with the OTP
    const token = jwt.sign({ otp }, process.env.OTP_SECRET_KEY, { expiresIn: '10m' });
   
    // Send the OTP via SMS
    const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
    const message = await client.messages.create({
      body: `Your OTP is ${otp}`,
      to: phoneNumber,
      from: '+12707139072'
    });

    console.log(message.sid);
    res.status(200).json({ success: true, message: 'OTP sent successfully', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to send OTP' });
  }
});

router.route('/verify-otp').post( async (req, res) => {
  try {
    const { otp, token } = req.body;
    
    // Verify the JWT token
    const decodedToken = jwt.verify(token, process.env.OTP_SECRET_KEY);
    
    if (decodedToken.otp !== otp) {
      return res.status(401).json({ success: false, message: 'Invalid OTP' });
    }
    
    res.status(200).json({ success: true, message: 'OTP verified successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to verify OTP' });
  }
});

module.exports = router;
