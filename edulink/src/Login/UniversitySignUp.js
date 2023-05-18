import React, { useState } from 'react';
import './Log.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function UniversitySignUp() {
  const [universityName, setUniversityName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  // const [error, setError] = useState('');
  const [scope, setScope] = useState('');
  const [type, setType] = useState('');
  const [logoFile, setLogoFile] = useState(null);

  const navigate = useNavigate();

  const OpenInstitutes = () => {
    navigate('/signin/university', { state: { id: 'universitylogin' } });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Perform form validation and submission logic here
    let errorMessage = null;
    if (universityName.length < 4) {
      errorMessage = 'University name must be at least 4 characters long';
    } else if (!email.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)) {
      errorMessage = 'Please enter a valid email address';
    } else if (password.length < 6) {
      errorMessage = 'Password must be at least 6 characters long';
    } else if (!confirmPassword) {
      errorMessage = 'Confirm password is required';
    } else if (password !== confirmPassword) {
      errorMessage = 'Passwords do not match';
    } else if (!scope) {
      errorMessage = 'Please select a scope';
    } else if (!type) {
      errorMessage = 'Please select a type';
    }
    if (!logoFile) {
      errorMessage = 'Logo is required';
    } else if (logoFile.size > 300 * 1024) {
      errorMessage = 'Logo size should be less than 300KB';
    } else if (!logoFile.type.includes('image')) {
      errorMessage = 'Logo should be in image format (JPG, JPEG, PNG)';
    }
    // setError(errorMessage);

    if (errorMessage === null) {
      verifyUniversitySignUp(universityName, email, password);
    }
  };

  const handleFocus = (event) => {
    event.target.style.backgroundColor = 'yellow';
  };

  const verifyUniversitySignUp = (instituteName, email, password) => {
    const formData = new FormData();
    formData.append('instituteName', instituteName);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('scope', scope);
    formData.append('type', type);
    formData.append('logoFile', logoFile);

    axios
      .post('http://localhost:8000/university/signup', formData)
      .then((response) => {
        const errorMessage = response.data.message;
        // setError(errorMessage);
      })
      .catch((error) => {
        const errorMessage = error.response.data.message;
       
      });
  };

  const handleBlur = (event) => {
    event.target.style.backgroundColor = 'white';
  };

  return (
    <div className='sign'>
      <div>
        <h1>Sign Up</h1>
      </div>
      <div className='information'>
        <form onSubmit={handleSubmit}>
          <label htmlFor='universityName'>Institute Name</label>
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
            id='confirmPassword'
            onFocus={handleFocus}
            onBlur={handleBlur}
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
          />

          <label htmlFor='scope'>Scope</label>
          <select
            id='scope'
            value={scope}
            onChange={(event) => setScope(event.target.value)}
            onFocus={handleFocus}
            onBlur={handleBlur}
          >
            <option value=''>Select a scope</option>
            <option value='college'>College</option>
            <option value='university'>University</option>
            <option value='school'>School</option>
          </select>

          <label htmlFor='type'>Type</label>
          <select
            id='type'
            value={type}
            onChange={(event) => setType(event.target.value)}
            onFocus={handleFocus}
            onBlur={handleBlur}
          >
            <option value=''>Select a type</option>
            <option value='overseas'>Overseas</option>
            <option value='public'>Public</option>
            <option value='private'>Private</option>
          </select>
          <label htmlFor="logo">Logo</label>
          <input
            type="file"
            id="logo"
            accept=".jpg, .jpeg, .png"
            onChange={(event) => setLogoFile(event.target.files[0])}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />

          {/* <div className='error'>{error}</div> */}

          <button className='next' type='submit'>
            Submit
          </button>
        </form>
        <button className='next' onClick={OpenInstitutes}>
          Login
        </button>
      </div>
    </div>
  );

}
