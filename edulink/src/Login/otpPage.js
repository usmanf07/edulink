import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './otp.css';
import { Navbar } from '../components';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

function OtpPage(props) {
    const [isOtpSent, setIsOtpSent] = useState(sessionStorage.getItem('phone') || false);
    const [otp, setOtp] = useState('');
    const [error, setError] = useState('');
    const history = useNavigate();
    
    const location = useLocation();
    const phoneNumber = location.state.phone;
    
    const email = location.state.id;
    const handleSubmit = async (e) => {
      e.preventDefault();
  
        try {
            const token = sessionStorage.getItem('otp-token');
          const res = await axios.post('http://localhost:8000/auth/verify-otp', { otp, token: token });
          const { success, message } = res.data;
            if (success) {
                console.log('OTP verified successfully');
                sessionStorage.removeItem('otp-token');
                sessionStorage.setItem('phone', phoneNumber);
                sessionStorage.setItem('email', email);
                history('/home');
                }
        } catch (err) {
           
            sessionStorage.setItem('phone', '');
            setError('Invalid OTP. Please try again.');
            setTimeout(() => {
                history('/login');
              }, 5000);
           
            
        }
      
    };
  
    return (
        <div>
             {/* <Navbar login={false} /> */}
             
      <div className="otp_container">
        <div>
            <h1>Verify OTP</h1>
        </div>
        <div className="otp_information">
          
          {isOtpSent && (
            <form onSubmit={handleSubmit}>
              <label>OTP sent to {phoneNumber}:</label>
              <input type="text" placeholder="OTP" value={otp} onChange={(e) => setOtp(e.target.value)} />
              <button type="submit">Verify OTP</button>
            </form>
          )}
          {error && <div className="error">{error}</div>}
          <br />
          <div className="forgot">
            <Link to="/forgot">Forgot Password?</Link>
          </div>
          <div className="signup">
            <Link to="/signup">Don't have an account? Sign Up</Link>
          </div>
        </div>
      </div>
      </div>
    );
    
  }
  
  export default OtpPage;  