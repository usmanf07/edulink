import React, { useRef } from 'react';
import "./MainPage.css";
import image from './Vector.png';
import picture from '../assets/th (3).jpeg';
import Nav  from '../components/navbar/Navbar';
import Desc from '../containers/Single_UniversityPage/University_Description';
import ButtonBar from '../containers/Single_UniversityPage/buttons_bar';
import Body from '../containers/Single_UniversityPage/Body';

// import SearchGroup from '../containers/All_UniversitiesPage_Components/SearchGroup';
// import Body from '../containers/All_UniversitiesPage_Components/Body';



class MainPage extends React.Component{

  constructor(){
    super();
    this.state =
    {
      InstituteName: "The National University of Computer and Emerging Sciences (NUST) ,Islamabad",
    }
  }

  render(){

    return (
      <div className='mainpage'>
  
  
      {/* <div className='mysvg'>
        <img src={image} alt="" />
      </div>
  
      <div className='blur'>
        <svg width="1000" height="1000" viewBox="0 0 2141 2141" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g filter="url(#filter0_f_2303_1068)">
          <circle cx="1070.5" cy="1070.5" r="506.5" fill="#002853"/>
          </g>
          <defs>
          <filter id="filter0_f_2303_1068" x="0" y="0" width="2141" height="2141" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
          <feFlood flood-opacity="0" result="BackgroundImageFix"/>
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
          <feGaussianBlur stdDeviation="282" result="effect1_foregroundBlur_2303_1068"/>
          </filter>
          </defs>
        </svg>
  
      </div> */}
  
      <div className='upper_layer'>
        <Nav/>
  
        <div className="picturebox" id="picture" picture>
          <div className="studentsInAStudyGroup008Wrapper" id="Pic_Container">
            <img className="studentsInAStudyGroup008Icon" alt="" src={picture}/>
          </div> 
  
          <h1 className="heading" id="Picture_text">
            <p className="yourAcademic">{this.state.InstituteName}</p> 
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
  
}

export default MainPage;
