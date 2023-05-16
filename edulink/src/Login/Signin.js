import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Log.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Signin() {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const history = useNavigate();
  const [phone, setPhone] = useState('');

  useEffect(() => {
    let reloadCount = sessionStorage.getItem('reloadCount2');
    reloadCount = reloadCount ? Number(reloadCount) : 0;

    if (reloadCount < 2) {
      sessionStorage.setItem('reloadCount2', String(reloadCount + 1));
      if (reloadCount === 0) {
        setTimeout(() => {
          window.location.reload();
        }, 0);
      }
    } else {
      sessionStorage.clear();
      sessionStorage.removeItem('reloadCount2');
    }
  }, []);

  async function submit(e) {
    e.preventDefault();
    
    try {
      setError('');
      const res = await axios.post('http://localhost:8000/login', { email, password });
      if (res.data !== 'notexists') {


        const sessionId = res.data.sessionId;
        const email = res.data.email;
        

        axios.get(`http://localhost:8000/users/${email}`)
        .then(res => {
          const userData = res.data;
          setPhone(userData.phone)
          console.log(userData.phone);
          sessionStorage.setItem('phone', userData.phone);

      
          axios.post('http://localhost:8000/auth/send-otp', { phoneNumber: userData.phone })
          .then(resp => {
            const { success, message, token } = resp.data;
            if (success) {
              console.log(`OTP sent successfully. Token: ${token}`);
              sessionStorage.setItem('otp-token', token);
               
           
            } else {
              console.log(`Failed to send OTP. Message: ${message}`);
            }
          })
          .catch(err => {
            console.log(`Failed to send OTP: ${err}`);
          });
          history('/Verify', { state: { id: email, phone: userData.phone } });
        })
        .catch(err => {
          console.log(err);
        });
       

      } else {
        setError('Invalid email or password. Please try again.');
      }
    } catch (err) {
      if (err.response) {
        // The server responded with an error status code (4xx or 5xx)
        setError(err.response.data.message || 'Something went wrong. Please try again later.');
      } else if (err.request) {
        // The request was made but no response was received
        setError('Could not connect to the server. Please try again later.');
      } else {
        // Something happened in setting up the request that triggered an Error
        setError('Something went wrong. Please try again later.');
      }

    }
  }

  


  return (
    <div className="sign">
      <div>
        <h1>Sign In</h1>
      </div>

      <div className="information">
        <form action="POST">
          <label>Email:</label>
          <input type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
          <label>Password:</label>
          <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
          <input type="submit" value="Login" onClick={submit} />
        </form>
        {error && <div className="error">{error}</div>}
        <br></br>
        <p>OR</p>
        <Link to="/signup">
          {' '}
          <input type="submit" value="Sign up"/>
        </Link>
      </div>
    </div>
  );
}

export default Signin;
