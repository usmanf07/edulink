import { useState } from 'react';
import './editProfile.css';
import axios from 'axios';

function EducationItem(props) {
  
const { onDelete } = props;
const email = props.email;
const empty = props.empty;

  const [isEditing, setIsEditing] = useState(false);
  const [instituteName, setInstituteName] = useState(props.edu.instituteName);
  const [degree, setDegree] = useState(props.edu.degree);
  const [startYear, setStartYear] = useState(props.edu.startYear);
  const [endYear, setEndYear] = useState(props.edu.endYear);
  const [result, setResult] = useState(props.edu.result);

  const [updatedinstituteName, updatedsetInstituteName] = useState(props.edu.instituteName);
  const [updateddegree, updatedsetDegree] = useState(props.edu.degree);
  const [updatedstartYear, updatedsetStartYear] = useState(props.edu.startYear);
  const [updatedendYear, updatedsetEndYear] = useState(props.edu.endYear);
  const [updatedresult, updatedsetResult] = useState(props.edu.result);

  const handleDelete = async (email, instituteName) => {

    try {
      await axios.delete(`http://localhost:8000/users/${email}/Institute/${instituteName}`);
      // Remove the education item from the state
      onDelete(); 
      //setEducation(prevEducation => prevEducation.filter(props.edu => props.edu.instituteName !== instituteName));
    } catch (error) {
      console.error(error);
    }
  }
  

  const handleSave = () => {

    const updatedEducation = 
    { 
        instituteName: updatedinstituteName, 
        degree: updateddegree, 
        startYear: updatedstartYear, 
        endYear: updatedendYear, 
        result: updatedresult 
    }
    
    setIsEditing(false);
    axios.put(`http://localhost:8000/users/${email}/Institute/${updatedinstituteName}`, updatedEducation)
    .then(res => {
        // If the request is successful, update the state with the new values
        setInstituteName(updatedinstituteName);
        setDegree(updateddegree);
        setStartYear(updatedstartYear);
        setEndYear(updatedendYear);
        setResult(updatedresult);
      })
      .catch(err => {
        // If the request fails, handle the error
        console.log(err);
      });
  };

  const handleCancel = () => {
    // reset form fields
    setInstituteName(props.edu.instituteName);
    setDegree(props.edu.degree);
    setStartYear(props.edu.startYear);
    setEndYear(props.edu.endYear);
    setResult(props.edu.result);
    setIsEditing(false);
  };
  
  return (
    <div>
      {empty ? (
        <div className='editProfile__profile-summary'><p>No Education Background Available</p></div>
      ) : (
        
        <div className='editProfile__profile-education-item'>
          {!isEditing ? (
            <div className='editProfile__profile-education-item-con'>
                
              <h1>{instituteName}</h1>
              <p>{degree}</p>
              <p>{startYear}-{endYear}</p>
              <p>CGPA: {result}</p>
            </div>
          ) : (
            
            <div className='editProfile__profile-education-item-con'>
              <div className='editProfile__profile-info-editing-c'>
                <label>Institute Name:</label>
                <input type='text' value={updatedinstituteName} onChange={(e) => updatedsetInstituteName(e.target.value)} />
              </div>
              <div className='editProfile__profile-info-editing-c'>
                <label>Degree:</label>
                <input type='text' value={updateddegree} onChange={(e) => updatedsetDegree(e.target.value)} />
              </div>
              <div className='editProfile__profile-info-editing-c'>
                <label>Starting Year:</label>
                <input type='text' value={updatedstartYear} onChange={(e) => updatedsetStartYear(e.target.value)} />
              </div>
              <div className='editProfile__profile-info-editing-c'>
                <label>Ending Year: </label>
                <input type='text' value={updatedendYear} onChange={(e) => updatedsetEndYear(e.target.value)} />
              </div>
              <div className='editProfile__profile-info-editing-c'>
                <label>Result: </label>
                <input type='text' value={updatedresult} onChange={(e) => updatedsetResult(e.target.value)} />
              </div>
            </div>
          )}
          <div>
            {!isEditing ? (
              <button onClick={() => setIsEditing(true)}>
                <img src='./edit_icon.svg' alt='Edit' />
              </button>
            ) : (
              <div className='editProfile__profile-info-editing'>
                <button onClick={handleSave}>
                  Save
                </button>
                <button style={{ backgroundColor: 'red' }} onClick={handleCancel}>
                  Cancel
                </button>
              </div>
            )}
            {!isEditing && (
              <button onClick={handleDelete}>
                <img src='./myimages/cross_icon.svg' alt='Delete' />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
   }

export default EducationItem;