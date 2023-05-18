import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./MainPage.css";
import image from './Vector.png';
import picture from '../assets/th (3).jpeg';

import Desc from '../containers/Single_UniversityPage/University_Description';
import ButtonBar from '../containers/Single_UniversityPage/buttons_bar';
import Body from '../containers/Single_UniversityPage/Body';
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';


// class MainPage extends React.Component{
  function MainPage(props){

    const [InstituteName1, setInstituteName] = useState();
    const { name } = useParams();
    const [BigPicture, setBigPicture] = useState();
    // console.log({name});

    useEffect(() => {

      console.log({name});


      axios.get(`http://localhost:8000/SingleInstitutePage/${name}`)
        .then((response) => {
          console.log(response.data);
          setInstituteName(response.data.instituteName);

          setBigPicture(response.data.bigPicture);
          // alert(response.data.bigPicture);
        })
        .catch((error) => console.error('Failed to retrieve universities:', error));




    }, []);





    return (
      <div className='mainpage'>

      <div className='upper_layer'>

        <div className="picturebox" id="picture" picture>
          <div className="studentsInAStudyGroup008Wrapper" id="Pic_Container">
            <img className="studentsInAStudyGroup008Icon" alt="" src={"http://localhost:8000/images/"+BigPicture}/>
          </div>

          <h1 className="heading" id="Picture_text">
            <p className="yourAcademic">{InstituteName1}</p>
          </h1>
        </div>


        <Desc name={name}/>
        {/* <ButtonBar name={name}/> */}
        <Body name={name}/>

        {/* <SearchGroup />
        <Body /> */}


      </div>




      </div>
    )

}

export default MainPage;
