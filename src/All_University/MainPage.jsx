import React, { useRef } from 'react';
import "./MainPage.css";
import image from './Vector.png';
import picture from './PictureBox.jpg';
import Nav from "../Compnents/Nav";
import SearchGroup from '../Compnents/SearchGroup';
import Body from '../Compnents/Body';



const MainPage = () => {

  return (
    <div className='mainpage'>


    <div className='mysvg'>
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

    </div>

    <div className='upper_layer'>
      <Nav/>

      <div className="picturebox" id="picture" picture>

      

        <div className="studentsInAStudyGroup008Wrapper" id="Pic_Container">
          <img className="studentsInAStudyGroup008Icon" alt="" src={picture}/>
        </div> 

        <h1 className="heading" id="Picture_text">
          <p className="yourAcademic">{`"Your Academic`}</p>
          <p className="yourAcademic">{`   Destiny Starts `}</p>
          <p className="yourAcademic">{`   Here"`} </p>
        </h1>
        
      
      </div> 

      <SearchGroup /> 
      <Body />

     
    </div>



    
    </div>
  )
}

export default MainPage;
