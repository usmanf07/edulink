import React, { useState } from 'react';
import './Log.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export default function UniversitySignIn() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSignUpClick = () => {
    navigate('/signup/university', { state: { id: 'university' } });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Perform form validation and submission logic here
    let errorMessage = null;
    if (!name) {
      errorMessage = 'Please enter a name';
    } else if (password.length < 6) {
      errorMessage = 'Password must be at least 6 characters long';
    }
    setError(errorMessage);

    if (errorMessage === null) {
      verifyUniversitySignIn(name, password);
    }
  };

  const handleFocus = (event) => {
    event.target.style.backgroundColor = 'yellow';
  };

  const verifyUniversitySignIn = (name, password) => {
    axios
      .post('http://localhost:8000/university/signin', {
        name: name,
        password: password,
      })
      .then((response) => {
        // console.log(response.data);
        const { message, id } = response.data;
        setError(message);

        sessionStorage.setItem('uniid', id);
        sessionStorage.setItem('uniname',name);

        navigate(`/universitydash/${name}`);
      })
      .catch((error) => {
        setError(error.response.data.message);
        // handle sign in error here
      });

  };


  const handleBlur = (event) => {
    event.target.style.backgroundColor = 'white';
  };

  return (
    <div className='sign'>
      <div>
        <h1>Sign In</h1>
      </div>
      <div className='information'>
        <form onSubmit={handleSubmit}>
          <label htmlFor='name'>Name</label>
          <input
            type='text'
            id='name'
            onFocus={handleFocus}
            onBlur={handleBlur}
            value={name}
            onChange={(event) => setName(event.target.value)}
          />

          <label htmlFor='password'>Password</label>
          <input
            type='password'
            id='password'
            onFocus={handleFocus}
            onBlur={handleBlur}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />

          <div className='error'>{error}</div>

          <button className='next' type='submit'>
            Sign In
          </button>
        </form>

        <button className='next' onClick={handleSignUpClick}>
          Sign Up
        </button>
      </div>
    </div>
  );
}