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
    const [websiteLink, setWebsiteLink] = useState(null);
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
        
        axios.get(`http://localhost:8000/fetchinstitutes/searchWebsite?q=${institute.uniName}`)
        .then(response => {
            const websiteLink = response.data.websiteLink;
            setWebsiteLink(websiteLink);
        })
        .catch(error => {
            console.error(error);
            setError('An error occurred while retrieving the website link.');
        });
      }, []);
  return (
    <div>
        <Navbar />
        <div className='outsiderInstitute'>
            <p>*This institute is currently not a member of our website!</p>
            <div className='outsiderInstitute__container'>
                <div>
            <h1>{institute.uniName}</h1> 
            </div>
            <div>
            <h2>Posted On: {institute.updated} Last Applying Date: {institute.lastApplyDate}</h2>
            </div>
            <div>
           <img src={imageUrl} alt='outsiderInstitute' />
           </div>
            </div>
        </div>
    </div>
  )
}

export default OutsiderInstitute