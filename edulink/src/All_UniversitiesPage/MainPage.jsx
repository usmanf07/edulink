import React, { useRef } from 'react';
import "./MainPage.css";
import picture from './PictureBox.jpg';
import SearchGroup from '../containers/All_UniversitiesPage_Components/SearchGroup';
import Body from '../containers/All_UniversitiesPage_Components/Body';
import Nav  from '../components/navbar/Navbar';

const MainPage = (props) => {




  return (
    <div className='mainpage'>
      {/* {alert(props.mycolor)} */}
    {/* <Nav/> */}
    <div className='upper_layer'>

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
      <Body navigate={props.navigate}/>


    </div>




    </div>
  )
}

export default MainPage;
