import React, { useState } from 'react'
import './Log.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import './PhoneNumberInput.css'; 
import { isValidPhoneNumber } from 'react-phone-number-input';

import { Link } from 'react-router-dom';

export default function UserSignUp() {
  const [userName, setuserName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [phoneNumber, setphoneNumber] = useState('')
  const [error, setError] = useState(null)

  const handleSubmit = (event) => {
    event.preventDefault();
  
    // Perform form validation and submission logic here
    let errorMessage = null;
    if (userName.length < 4) {
      errorMessage = 'User name must be at least 4 characters long';
    } else if (!email.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)) {
      errorMessage = 'Please enter a valid email address';
    } else if (password.length < 6) {
      errorMessage = 'Password must be at least 6 characters long';
    } else if (!confirmPassword) {
      errorMessage = 'Confirm password is required';
    } else if (password !== confirmPassword) {
      errorMessage = 'Passwords do not match';
    } else if (!isValidPhoneNumber(phoneNumber)) {
      errorMessage = 'Please enter a valid phone number';
    }
    setError(errorMessage);
    console.log(phoneNumber);
    if (errorMessage === null) {
      verifyUserSignUp(userName, email, password, phoneNumber);
    }
  };

  const handleFocus = (event) => {
    event.target.style.backgroundColor = 'yellow'
  }
  const verifyUserSignUp = (userName, email, password, phoneNumber) => {

    axios.post('http://localhost:8000/signup', {
      userName: userName,
      email: email,
      password: password,
      phoneNumber: phoneNumber
    }).then(response => {
      
    }).catch(error => {
     setError(error.response.data.message);
    });
  }

  const handleBlur = (event) => {
    event.target.style.backgroundColor = 'white'
  }

  return (
    <div className='sign'>
      <div>
        <h1>Sign Up</h1>
      </div>
      <div className='information'>
        <form onSubmit={handleSubmit}>
          <label htmlFor='userName'>User Name</label>
          <input
            type='text'
            id='userName'
            value={userName}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={(event) => setuserName(event.target.value)}
          />

          <label htmlFor='email'>Email</label>
          <input
            type='email'
            id='email'
            onFocus={handleFocus}
            onBlur={handleBlur}
            value={email}
            onChange={(event) => setEmail(event.target.value)}
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

          <label htmlFor='confirmPassword'>Confirm Password</label>
          <input
            type='password'
            id='confirmPassword'
            onFocus={handleFocus}
            onBlur={handleBlur}
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
          />


<label htmlFor='phoneNumber'>Phone Number</label>
<PhoneInput
  id='phoneNumber'
  value={phoneNumber}
  onFocus={handleFocus}
  onBlur={handleBlur}
  onChange={(value) => setphoneNumber(value)}
  style={{width:'50%'}}
/>



          <div className='error'>{error}</div>

          <button className='next' type='submit'>
            Sign Up
          </button><br>
          </br>


        </form>
        <p>OR</p>
        <p>Already have an account?</p>
        <Link to='/login'>
        <button className='next' >
            Login
          </button>
          </Link>
      </div>
      
    </div>
  )
}
