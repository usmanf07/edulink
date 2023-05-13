import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Log.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Signin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const history = useNavigate();

  async function submit(e) {
    e.preventDefault();
    try {
      setError('');
      const res = await axios.post('http://localhost:8000/login', { email, password });
      if (res.data !== 'notexists') {
        const sessionId = res.data.sessionId;
        const email = res.data.email;
        sessionStorage.setItem('sessionId', sessionId);
        sessionStorage.setItem('email', email);
        history('/home', { state: { id: email } });
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
          <input type="submit" onClick={submit} />
        </form>
        {error && <div className="error">{error}</div>}
        <br></br>
        <p>OR</p>
        <Link to="/Signup1">
          {' '}
          <button>Sign Up</button>
        </Link>
      </div>
    </div>
  );
}

export default Signin;
