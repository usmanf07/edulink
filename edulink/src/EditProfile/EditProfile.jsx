
import React, { useEffect, useState } from 'react';
import {Navbar } from '../components';
import './editProfile.css';
import { useParams } from 'react-router-dom';
import ProgressBar from './ProgressBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';

export default function EditProfile() {
  const [progress, setProgress] = useState(0);
  const [progressBarColor, setprogressBarColor] = useState('');
  const [personalInfo, setPersonalInfo] = useState(true);
  const [education, setEducation] = useState(true);
  const [picture, setPicture] = useState(true);
  const [summary, setSummary] = useState(true);
  const [preferences, setPreferences] = useState(true);

  const [isLogin, setIsLogin] = useState(localStorage.getItem('loggedin'));
  const temp =useParams();
 
  const getProgressBarColor = (progress) => {
    if (progress >= 0 && progress <= 20) {
      return '#FF0000'; // red
    } else if (progress > 20 && progress <= 40) {
      return '#FFFF00'; // yellow
    } else if (progress > 40 && progress <= 60) {
      return '#FFA500'; // orange
    } else if (progress > 60 && progress <= 100) {
      return '#00D7A3'; // #00D7A3
    }
  }

  

  useEffect(() => {
    let newProgress = 0;
    if (personalInfo) {
      newProgress += 20;
    }
    if (education) {
      newProgress += 20;
    }
    if (picture) {
      newProgress += 20;
    }
    if (summary) {
      newProgress += 20;
    }
    if (preferences) {
      newProgress += 20;
    }
    setProgress(newProgress);
    setprogressBarColor(getProgressBarColor(newProgress));
  }, [personalInfo, education, picture, summary, preferences]);
  
  

  useEffect(() => {
    ;
    if (temp.id==null) {
      setIsLogin(false);

    } else {
      setIsLogin(true);
    }
  }, [temp]);

  return (
    <div>
      <Navbar login={isLogin} name={temp.id} />
      <div className="editProfile">
        <div className="editProfile__header">
          
          <h1>Update Your Profile for Better Recommendations</h1>
            
            <ProgressBar progress={progress} color1={progressBarColor} color2={'#FFFFFF'}/>
            
  
          <div className="editProfile__header-labels">
              <div className="editProfile__header-label">
                {personalInfo ? <FontAwesomeIcon icon={faCheck} style={{ color: 'green' }} /> : <FontAwesomeIcon icon={faTimes} style={{ color: 'red' }} />}
                <label>Personal Info</label>
              </div>
              <div className="editProfile__header-label">
              {picture ? <FontAwesomeIcon icon={faCheck} style={{ color: 'green' }} /> : <FontAwesomeIcon icon={faTimes} style={{ color: 'red' }} />}
                <label>Picture</label>
              </div>
              <div className="editProfile__header-label">
              {summary ? <FontAwesomeIcon icon={faCheck} style={{ color: 'green' }} /> : <FontAwesomeIcon icon={faTimes} style={{ color: 'red' }} />}
                <label>Summary</label>
              </div>
              <div className="editProfile__header-label">
              {education ? <FontAwesomeIcon icon={faCheck} style={{ color: 'green' }} /> : <FontAwesomeIcon icon={faTimes} style={{ color: 'red' }} />}
                <label>Education</label>
              </div>
              <div className="editProfile__header-label">
              {preferences ? <FontAwesomeIcon icon={faCheck} style={{ color: 'green' }} /> : <FontAwesomeIcon icon={faTimes} style={{ color: 'red' }} />}
                <label>Preferences</label>
              </div>
            </div>
        </div>
        <div className="editProfile__body">
          <div className="editProfile__body-containter">
            <div className="editProfile__body-containter-head">
              <h2>Personal Information</h2>
              <button>
              <img src='./edit_icon.svg' alt="Edit Icon" />
              </button>
            </div>
            <hr></hr>
            <div className="editProfile__body-containter-body">
              <div className='editProfile__profile-pic'>
              {/* <img src='./myimages/uni1.png' alt="Profile Pic" /> */}
              </div>
              <div className='editProfile__profile-info'>
                <h1>John Doe</h1>
                <p>johndoe@gmail.com</p>
                <p>+9232145789</p>
                <p>House 20, Johar Town, Lahore</p>
              </div>
            </div>
          </div>
          <div className="editProfile__body-containter">
          <div className="editProfile__body-containter-head">
              <h2>Profile Summary</h2>
              <button>
              <img src='./edit_icon.svg' alt="Edit Icon" />
              </button>
            </div>
            <hr></hr>
            <div className='editProfile__profile-summary'>
              <p>"John Doe is a highly skilled software engineer with years of experience in the field. He has a deep understanding of software development principles and possesses a strong knowledge of programming languages such as Java, Python, and C++. John is a versatile and adaptable engineer who excels in both team-based and individual work environments. He is highly proficient in developing software solutions and managing complex projects, and has a strong track record of delivering results that exceed expectations. John is also a great communicator who is able to translate technical information into non-technical language, making him an asset in any team. Overall, John is an experienced and dedicated software engineer who consistently demonstrates his expertise and commitment to delivering high-quality software solutions"</p>
            </div>
          </div>
          <div className="editProfile__body-containter">
          <div className="editProfile__body-containter-head">
              <h2>Education</h2>
              <button>
              <img src='./edit_icon.svg' alt="Edit Icon" />
              </button>
            </div>
            <hr></hr>
            <div className='editProfile__profile-education'>
              <div className='editProfile__profile-education-item'>
                <h1>University of Engineering and Technology, Lahore</h1>
                <p>Bachelors in Computer Science</p>
                <p>2017-2021</p>
                <p>CGPA: 3.5</p>
                
              </div>
              
              <div className='editProfile__profile-education-item'>
              <h1>College, Lahore</h1>
                <p>Bachelors in Computer Science</p>
                <p>2015-2017</p>
                <p>4A</p>
                </div>
            </div>
          </div>
          <div className="editProfile__body-containter">
          <div className="editProfile__body-containter-head">
              <h2>Admission Preferences</h2>
              <button>
              <img src='./edit_icon.svg' alt="Edit Icon" />
              </button>
            </div>
            <hr></hr>
            <div className='editProfile__profile-preferences'>
              <div className='editProfile__profile-preferences-item'>
                <p>Software</p>
              </div>
              <div className='editProfile__profile-preferences-item'>
                <p>Civil Engineering</p>
              </div>
              <div className='editProfile__profile-preferences-item'>
                <p>Databases</p>
              </div>
              <div className='editProfile__profile-preferences-item'>
                <p>Networking</p>
              </div>
              <div className='editProfile__profile-preferences-item'>
                <p>Maths</p>
              </div>
              <div className='editProfile__profile-preferences-item'>
                <p>Sciences</p>
              </div>
            </div>  
          </div>
        </div>

      </div>
    </div>
  );
}
