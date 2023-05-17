
import React, { useEffect, useState } from 'react';
import {Navbar } from '../components';
import './editProfile.css';
import { useParams } from 'react-router-dom';
import ProgressBar from './ProgressBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import EducationItem from './EducationItem';
import Cropper from 'react-easy-crop';


export default function EditProfile() {
  const [progress, setProgress] = useState(0);
  const [progressBarColor, setprogressBarColor] = useState('');
  
  const [fullName, setfullName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [education, setEducation] = useState([]);
  const [picture, setPicture] = useState("");
  const [summary, setSummary] = useState('');

  const [isEditMode, setIsEditMode] = useState(false);
  const [ispersonalEditMode, setpersonalEditMode] = useState(false);
  const [isImageEditMode, setIsImageEditMode] = useState(false);

  const [crop, setCrop] = useState({
    x: 0,
    y: 0,
    width: 0, // set default width to 100
    height: 0 // set default height to 100
  });
  const [zoom, setZoom] = useState(1);
  const [croppedImage, setCroppedImage] = useState(null);
  const [isCropDialogOpen, setIsCropDialogOpen] = useState(false);

  const [updatedFullName, setUpdatedFullName] = useState('');
  const [updatedAddress, setUpdatedAddress] = useState('');
  const [updatedSummary, setUpdatedSummary] = useState('');
  const [updatedPhone, setUpdatedPhone] = useState('');

  const [isLogin, setIsLogin] = useState(localStorage.getItem('loggedin'));
  
  const [sessionId, setSessionId] = useState('');
  const [email, setEmail] = useState('');
  const [emptyInstitue, setemptyInstitue] = useState(true);
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

  const handleOpenCropDialog = () => {
    setIsCropDialogOpen(true);
    setIsImageEditMode(false);
  };

  const handleAddInstitute = () =>
  {
    setemptyInstitue(false);
    setEducation([...education, {}]);
  }
  useEffect(() => {
    // Get sessionId and email from sessionStorage
    const sessionId = sessionStorage.getItem('sessionId');
    const email = sessionStorage.getItem('email');
  
    // Set the state variables with the retrieved values
    setSessionId(sessionId);
    setEmail(email);
    setIsLogin(true);
    
    // Send GET request with email as a parameter
    axios.get(`http://localhost:8000/users/${email}`)
      .then(res => {
        const userData = res.data;
        setfullName(userData.fullName);
        setUpdatedFullName(userData.fullName);
        setPhone(userData.phone);
        setUpdatedPhone(userData.phone);
        setUpdatedSummary(userData.profileSummary);
        setUpdatedAddress(userData.address);
        setAddress(userData.address);
        setEducation(userData.educationBackground);
        setPicture(userData.avatar);
       
        setSummary(userData.profileSummary);
   
      })
      .catch(err => {
        console.log(err);
      });
  }, []);
  
//   useEffect(() => { axios.post('http://localhost:8000/users/add')
//   .then(res => {
//     console.log(res.data.message); // "User added successfully"
//   })
//   .catch(err => {
//     console.log(err);
//   });
// }, []);
  
  useEffect(() => {
    
    let newProgress = 0;
    if (fullName) {
      newProgress += 5;
    }
    if (email) {
      newProgress += 10;
    }
    if (phone) {
      newProgress += 5;
    }
    if (address) {
      newProgress += 5;
    }
    if (education) {
      newProgress += 25;
    }
    if (picture) {
      newProgress += 25;
    }
    if (summary) {
      newProgress += 25;
    }

    setProgress(newProgress);
    setprogressBarColor(getProgressBarColor(newProgress));
  }, [fullName, education, picture, summary]);

  const handleUpdatePersonalInfo = () => {
    setIsEditMode(false);
    setpersonalEditMode(false);
    // Create an object with the updated values
    const updatedValues = {
      fullName: updatedFullName,
      phone: updatedPhone,
      address: updatedAddress,
      profileSummary: updatedSummary,
     
    };
    // Make an axios PUT request to update the user's personal information
    axios.put(`http://localhost:8000/users/${email}`, updatedValues)
      .then(res => {
        // If the request is successful, update the state with the new values
        setfullName(updatedFullName);
        setPhone(updatedPhone);
        setAddress(updatedAddress);
        setSummary(updatedSummary);
        //setEducationBackground(updatedEducationBackground);
      })
      .catch(err => {
        // If the request fails, handle the error
        console.log(err);
      });
  };
  
  const handleDelete = (instituteName) => {
    setEducation(prevEducation => prevEducation.filter(edu => edu.instituteName !== instituteName));
  }

  const handleImageUpload = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('email', email);
    formData.append('avatar', e.target.files[0]);
    try {
      const res = await axios.post('http://localhost:8000/users/upload', formData);
      
      setPicture(res.data.avatar);
      setIsImageEditMode(false);
    } catch (error) {
      console.log(error.response.data);
    }
  }
    
    const handleCloseCropDialog = () => {
    setIsCropDialogOpen(false);
    };
    
    const handleCropImage = () => {
      const imageUrl = `http://localhost:8000/uploads/${picture}`;
      if (!imageUrl) {
        console.error('Image not found');
        return;
      }
     
      getCroppedImg(imageUrl, crop);
    };

    const getCroppedImg = (imageUrl, crop) => {

        console.log(crop.x, crop.y, crop.width, crop.height);
       
      return new Promise((resolve, reject) => {
        const image = new Image();
        image.src = imageUrl;
        image.onload = () => {
          const canvas = document.createElement('canvas');
          const scaleX = image.naturalWidth / image.width;
          const scaleY = image.naturalHeight / image.height;
          
          canvas.width = crop.x * scaleX;
          canvas.height = crop.y * scaleY;
          
          const ctx = canvas.getContext('2d');
          ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width * scaleX,
            crop.height * scaleY
          );
          const blobPromise = new Promise((resolve) => canvas.toBlob(resolve));

          blobPromise.then((blob) => {
            const file = new File([blob], 'filename.jpeg', { type: 'image/jpeg' });
            const formData = new FormData();
           
            formData.append('email', email);
            formData.append('avatar', file);
            
            axios.post('http://localhost:8000/users/upload', formData)
              .then((res) => {
                setPicture(res.data.avatar);
                setIsImageEditMode(false);
                setIsCropDialogOpen(false);
              })
              .catch((error) => {
                console.error('Failed to save image:', error);
                reject();
              });
          }, 'image/jpeg', 0.8);
        };
        
        image.onerror = () => {
          console.error('Failed to load image');
          reject();
        };
      });
    };
  

  return (
    <div>
      {/* <Navbar login={isLogin} name={fullName} /> */}
      <div className="editProfile">
        <div className="editProfile__header">
          
          <h1>Update Your Profile for Better Recommendations</h1>
            
            <ProgressBar progress={progress} color1={progressBarColor} color2={'#FFFFFF'}/>
            
  
          <div className="editProfile__header-labels">
              <div className="editProfile__header-label">
                {fullName && email && address && phone ? <FontAwesomeIcon icon={faCheck} style={{ color: 'green' }} /> : <FontAwesomeIcon icon={faTimes} style={{ color: 'red' }} />}
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
             
            </div>
        </div>
        <div className="editProfile__body">
          <div className="editProfile__body-containter">
            <div className="editProfile__body-containter-head">
              <h2>Personal Information</h2>
              <button onClick={() => setpersonalEditMode(!ispersonalEditMode)}>
                <img src='./edit_icon.svg' alt="Edit Icon" />
              </button>
            </div>
            <hr></hr>
            <div className="editProfile__body-containter-body">
            
            <div className='editProfile__profile-pic' style={{ position: 'relative' }}>
  <div className='editPicture_icon'>
    <button
      onClick={() => setIsImageEditMode(!isImageEditMode)}
      style={{ position: 'absolute', top: 0, right: -10 }}
    >
      <img height={'20px'} width={'20px'} src='./edit_icon.svg' alt='Edit Icon' />
    </button>
  </div>
  {isImageEditMode ? (
    <div>
      <input type='file' onChange={handleImageUpload} />
      <div className='editProfile__profile-info-editing'>
        <button style={{ backgroundColor: 'red' }} onClick={() => setIsImageEditMode(false)}>
          Cancel
        </button>
        <button onClick={handleOpenCropDialog}>Crop</button>
      </div>
    </div>
  ) : (
    <div>
      {croppedImage ? (
        <img height={'100px'} width={'100px'} src={croppedImage} alt='Profile Pic' />
      ) : (
        <img height={'100px'} width={'100px'} src={`http://localhost:8000/uploads/${picture}`} alt='Profile Pic' />
      )}
    </div>
  )}
  {isCropDialogOpen && (
    <div className='cropDialog'>
      <Cropper
        image={`http://localhost:8000/uploads/${picture}`}
        crop={crop}
        zoom={zoom}
        aspect={1}
        onCropChange={newCrop => setCrop(newCrop)} // set crop state here
        onZoomChange={setZoom}
      />
      <div className='cropDialog__controls'>
        
      </div>
    </div>
  )}
  
</div>




            <div className='editProfile__profile-info'>
              {ispersonalEditMode ? (
                <div className='editProfile__profile-info-editing'>
                  <div className='editProfile__profile-info-editing-c'>
                  <label>Full Name</label>
                  <input type="text" value={updatedFullName} onChange={(e) => setUpdatedFullName(e.target.value)} />
                  </div>
                  <div className='editProfile__profile-info-editing-c'>
                  <label>Phone</label>
                  <input type="number" value={updatedPhone} onChange={(e) => setUpdatedPhone(e.target.value)} />
                  </div>
                  <div className='editProfile__profile-info-editing-c'>
                  <label>Address</label>
                  <input type="text" value={updatedAddress} onChange={(e) => setUpdatedAddress(e.target.value)} />
                  </div>
                  <button onClick={() => handleUpdatePersonalInfo()}>Save</button>
                </div>
              ) : (
                <div>
                  {fullName ? (
                    <div>
                      <h1>{fullName}</h1>
                      <p>Email: {email}</p>
                      <p>Phone: {phone}</p>
                      <p>Address: {address}</p>
                    </div>
                  ) : (
                    <p>Personal info not available.</p>
                  )}
                </div>
              )}
              {isCropDialogOpen && (
              <div className='editProfile__profile-info-editing'>
              <button style={{ backgroundColor: 'red' }} onClick={handleCloseCropDialog}>Cancel</button>
              <button onClick={handleCropImage}>Save</button>
              </div>
              )}
             
            </div>
            </div>
          </div>
          <div className="editProfile__body-containter">
            <div className="editProfile__body-containter-head">
              <h2>Profile Summary</h2>
              <button onClick={() => setIsEditMode(!isEditMode)}>
                <img src='./edit_icon.svg' alt="Edit Icon" />
              </button>
            </div>
            <hr></hr>
            <div className='editProfile__profile-summary'>
              {isEditMode ? (
                <div className='editProfile__profile-info-editing'>
                  <textarea className='editProfile__profile-summary-editing' value={updatedSummary} onChange={(e) => setUpdatedSummary(e.target.value)}></textarea>
                  <button onClick={() => handleUpdatePersonalInfo()}>Save</button>
                </div>
                ) : (
                <p>{summary ? summary : 'Summary not available.'}</p>
              )}
              
            </div>
          </div>
          <div className="editProfile__body-containter">
          <div className="editProfile__body-containter-head">
              <h2>Education</h2>
              <div style={{ textAlign: 'center' }}>
                <button onClick={()=> handleAddInstitute()} style={{height:'30px',borderRadius:'10px', margin:'1rem', width: '150px', backgroundColor: '#2785F4', color:'white', textAlign: 'center'}}>Add a Institute</button>
              </div>
            </div>
            <hr></hr>

          <div className='editProfile__profile-education'>
            {education ? (
              education.map((edu, index) => (
                <EducationItem 
                    email={email}
                    instituteName={edu.instituteName}
                    key={index}
                    edu={edu} 
                    onDelete={() => handleDelete(edu.instituteName)}
                />
              ))):  <EducationItem empty={emptyInstitue} edu={''}/> }
             
            
          </div>

          </div>
        </div>

      </div>
    </div>
  );
}
