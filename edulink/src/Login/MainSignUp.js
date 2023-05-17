import React from 'react'

import './MainSign.css'
import { useNavigate } from 'react-router-dom'


export default function MainSignUp() {

  const navigate =useNavigate ();

  const OpenInstitutes = () => {
    navigate("/signup/university", { state:{id:"university"}}  );

  }
  const OpenUser = () => {
    navigate("/signup/user", { state:{id:"user"}}  );

  }

  return (
    
    <div className='myMain'>
      <div className='signUpHeading'><h1>Join as a Student Or Institute</h1></div>
      <div className='signupcontainer'>
      <div className=' le'onClick={OpenUser}>
        <div className="imgset">
          <img src='graduate.png'/>
        </div>
        <div className='info_i'>
        I am a Student, Want to
        Explore Institutes
        </div>
      </div>
      <div className=' re' onClick={OpenInstitutes}>
      <div className="imgset">
          <img src='university.png'/>
        </div>
        <div className='info_i'>
        I am an Institute, Want
        to Receive Applications
        </div>


      </div>

      </div>




    </div>
  )
}

