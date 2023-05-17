import React, { useState, useEffect } from 'react'
import { Navbar } from '../components'
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import './outsiderInstitute.css'
function OutsiderInstitute()
{
    const location = useLocation();
    const institute = location.state.institute;
    const [imageUrl, setImageUrl] = useState(null);
    const [error, setError] = useState(null);
    const [websiteLink, setWebsiteLink] = useState('');
    const[desc , setDesc] = useState('');
    const [logo, logoUrl] = useState(null);
    useEffect(() => {
        const imageUrlParam = institute.href;
        axios.get(`http://localhost:8000/fetchinstitutes/fetchImage?imageUrl=${imageUrlParam}`)
          .then(response => {
            setImageUrl(response.data.imageUrl);
          })
          .catch(error => {
            console.error(error);
            setError('An error occurred while retrieving the image.');
          });
      }, []);

      useEffect(() => {
        
        axios.get(`http://localhost:8000/fetchinstitutes/fetch-data?query=${institute.uniName}`)
        .then(response => {
            console.log(response.data);
            setDesc(response.data.snippet);
            setWebsiteLink(response.data.link);
            logoUrl(response.data.logo);
        })
        .catch(error => {
            console.error(error);
            setError('An error occurred while retrieving the website link.');
        });
      }, []);

      
  return (
    <div>
        {/* <Navbar /> */}
        <div className='outsiderInstitute'>
            <p>*This institute is currently not a member of our website!</p>
            <div className='outsiderInstitute__container'>
                <div>
                <div>
                <img src={logo} alt='outsiderInstitute' style={{ maxWidth: '1000px', maxHeight: '500px', objectFit: 'contain' }} />
                </div>
                </div>
                <div>
            <h1>{institute.uniName}</h1> 
            </div>
            <div>
            <h2>Posted On: {institute.updated} Last Applying Date: {institute.lastApplyDate}</h2>
            </div>
            <div>
                <p>Institute Description: {desc}</p>
            </div>
            <div>
           <img style={{height:'500px', width:'400px'}} src={imageUrl} alt='outsiderInstitute' />
           
           </div>
            <div className='editProfile__profile-info-editing'>
            <button>
                <a href={websiteLink} target="_blank" rel="noopener noreferrer">
                Go to Institute Site
                </a>
            </button>
            </div>
            </div>
        </div>
    </div>
  )
}

export default OutsiderInstitute