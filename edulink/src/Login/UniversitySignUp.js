import React, { useState } from 'react'
import './Log.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';





export default function UniversitySignUp() {
  const [universityName, setUniversityName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState(null)




  const navigate =useNavigate ();

  const OpenInstitutes = () => {
    navigate("/signin/university", { state:{id:"universitylogin"}}  );

  }

  const handleSubmit = (event) => {
    event.preventDefault()

    // Perform form validation and submission logic here
    let errorMessage = null
    if (universityName.length < 4) {
      errorMessage = 'University name must be at least 4 characters long'
    } else if (!email.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)) {
      errorMessage = 'Please enter a valid email address'
    } else if (password.length < 6) {
      errorMessage = 'Password must be at least 6 characters long'
    } else if (!confirmPassword) {
      errorMessage = 'Confirm password is required'
    } else if (password !== confirmPassword) {
      errorMessage = 'Passwords do not match'
    }
    setError(errorMessage)

    if (errorMessage === null) {
      verifyUniversitySignUp(universityName, email, password)
    }


  }

  const handleFocus = (event) => {
    event.target.style.backgroundColor = 'yellow'
  }
  const verifyUniversitySignUp = (instituteName, email, password) => {



    axios.post('http://localhost:8000/university/signup', {
      instituteName: instituteName,
      email: email,
      password: password
    }).then(response => {
      setError(response.data.message);
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
          <label htmlFor='universityName'>University Name</label>
          <input
            type='text'
            id='universityName'
            value={universityName}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={(event) => setUniversityName(event.target.value)}
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
            onFocus={handleFocus}
            onBlur={handleBlur}
            id='confirmPassword'
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
          />

          <div className='error'>{error}</div>

          <button className='next' type='submit'>
            Submit
          </button><br>
          </br>


        </form>
        <button className='next' onClick={OpenInstitutes} >
            Login
          </button>
      </div>
    </div>
  )
}
