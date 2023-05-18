import React, {useEffect, useState} from 'react'
import './userApplications.css'
import {Navbar } from '../components';
import axios from 'axios';
export default function UserApplications() {
  const [isLogin, setIsLogin] = useState(sessionStorage.getItem('email'));
  const [email, setEmail] = useState('');
  
  const [applications, setApplications] = useState(null);
  
const [menuBox, setMenuBox] = useState(applications? (Array(applications.length).fill(false)): []);

useEffect(() => {
  // Get sessionId and email from sessionStorage
  const sessionId = sessionStorage.getItem('sessionId');
  const email = sessionStorage.getItem('email');

  // Set the state variables with the retrieved values
 
  setEmail(email);
  setIsLogin(true);
  
  // Send GET request with email as a parameter
  axios.get(`http://localhost:8000/application/${email}`)
    .then(res => {
      setApplications(res.data);
      console.log(res.data);
    })
    .catch(err => {
      console.log(err);
    });
}, []);
  const handleMenuBoxClick = (index) => {
    setMenuBox(menuBox.map((value, i) => i === index ? !value : false));
  }
  
  const handleDeleteApplication = (index) => {
    const selectedApplication = applications[index];
    const id = selectedApplication._id;
    axios.delete(`http://localhost:8000/application/${id}`)
      .then(res => {
        console.log(res.data);
        setApplications(applications.filter(application => application._id !== id));
      })
      .catch(err => {
        console.log(err);
      });
  }


  return (
    <div>
      {/* <Navbar login={isLogin} name={email} /> */}
      <div className='userApplications'>
  <h1>My Applications</h1>
  {applications === null ? (<h2 style={{marginTop: '0.7rem'}}>You did not submit any applications yet!</h2>) : (
  <div className='userApplications__container'>
   {applications.map((application, index) => (
      <div key={application.id} className='userApplications__container__card'>
        <div className='userApplications__container__card-head'>
          <div className='userApplications__container__card-head-info'>
            {console.log(application.logo)}
            <img src={`http://localhost:8000/logos/${application.logo}`} alt={application.uniName} />
            <div>
              <h2>{application.uniName}</h2>
              <p>Applied For: {application.appliedFor}</p>
              <p>Application Status: {application.applicationStatus}</p>
              <p>Applied Date: {new Date(application.appliedDate).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </div>
          </div>
          <div className='userApplications__container__card-head-info2'>
          <button onClick={() => handleDeleteApplication(index)}>
              <img src='./cross_icon_2.svg' alt='cross' />
            </button>
          </div>
        </div>

        <div onClick={() => handleMenuBoxClick(index)} className='userApplications__container__card-menubox'>
          <p>Show More Details</p>
          <img src='./down-arrow.svg' alt='arrow' className='userApplications-arrow' style={{marginLeft: '0.7rem'}}/>
        </div>

        {menuBox[index] && (
  <div className='userApplications__container__card-menu'>
    <div>
      <h4>Additional Requirements Needed</h4>
      {application.additionalRequirements ?
        application.additionalRequirements.map(requirement => (
          <p key={requirement}>{requirement}</p>
        )) :
        <p>None</p>
      }
    </div>
    <div>
      <h4>Other Info</h4>
      {application.otherInfo.map(info => (
        <p key={info}>{info}</p>
      ))}
    </div>
  </div>
)}

      </div>
    ))} 
  </div>)}
</div>

    </div>
  )
}
