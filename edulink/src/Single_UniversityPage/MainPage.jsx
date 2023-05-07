import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./MainPage.css";
import image from './Vector.png';
import picture from '../assets/th (3).jpeg';
import Nav  from '../components/navbar/Navbar';
import Desc from '../containers/Single_UniversityPage/University_Description';
import ButtonBar from '../containers/Single_UniversityPage/buttons_bar';
import Body from '../containers/Single_UniversityPage/Body';

// class MainPage extends React.Component{
  function MainPage(){

    const [InstituteName1, setInstituteName] = useState();

    useEffect(() => {
      axios.get('http://localhost:8000/SingleInstitutePage')
        .then((response) => {
          // console.log(response.data[0].instituteName);
          setInstituteName(response.data[0].instituteName);
        })
        .catch((error) => console.error('Failed to retrieve universities:', error));

  
    }, []);

   



    return (
      <div className='mainpage'>
  
      <div className='upper_layer'>
        <Nav/>
  
        <div className="picturebox" id="picture" picture>
          <div className="studentsInAStudyGroup008Wrapper" id="Pic_Container">
            <img className="studentsInAStudyGroup008Icon" alt="" src={picture}/>
          </div> 
  
          <h1 className="heading" id="Picture_text">
            <p className="yourAcademic">{InstituteName1}</p> 
          </h1>
        </div> 
  
  
        <Desc />
        <ButtonBar />
        <Body />
        
        {/* <SearchGroup /> 
        <Body /> */}
  
       
      </div>
  
  
  
      
      </div>
    )
  
}

export default MainPage;
