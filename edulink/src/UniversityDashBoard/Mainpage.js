import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./MainPage.css";
import University_Description from '../UniversityDashBoard/University_Description';
import ButtonBar from '../UniversityDashBoard/buttons_bar';
import Body from '../UniversityDashBoard/Body';
import Nav  from '../components/navbar/Navbar';

import { useNavigate, useParams } from 'react-router-dom';
import NameChange from './NameChange';
import DescriptionChange from './DescriptionChange';
import Addaprogram from './Addaprogram';
import AddADomain from './AddADomain';



// class MainPage extends React.Component{
  function Mainpage(props){

    const [showForm, setShowForm] = useState(false);
    const [showaddd,setAddd]=useState(0);
    const [isBlue, setIsBlue] = useState(false);
    const [InstituteName1, setInstituteName] = useState();
    const { name } = useParams();
    const [image, setImage] = useState(null);
    const [descrip,setDes]=useState();
    const [BigPicture, setBigPicture] = useState();
    const navigate =useNavigate();
    const [nameedit,setNameEdit] =useState(0);
    const [showaddp,setAddP]= useState (0);
    const [descc,setDescc]=useState(0);
    const [tempDomain,setDomain]=useState('');
    const [back,setBack]=useState('');



    // console.log({name});

    useEffect(() => {

      if (image) {
        setBack(image.name);
      }
      console.log({name});

      axios.get(`http://localhost:8000/SingleInstitutePage/${name}`)
        .then((response) => {
          console.log(response.data);
          setInstituteName(response.data.instituteName);
          if(response.data.bigPicture!=null){
           setBigPicture(response.data.bigPicture);
          }
          else
          {

            setBigPicture("noimage.jpeg");
          }
        })
        .catch((error) => console.error('Failed to retrieve universities:', error));




    }, [image,back]);


    const changenewName =(newName) => {


      setNameEdit(0);
      setIsBlue(false);

      axios.post(`http://localhost:8000/SingleInstitutePage/changename/${InstituteName1}/${newName}`)
      .then(response => {
        setInstituteName(newName);
        navigate(`/universitydash/${newName}`);

      })
      .catch(error => {
        console.log(error.response.data);
      });




    }


    const dealcancel =(temp)=>{

      if(temp==="Name")
      {
        cancelNameChange();
      }
      if(temp==="Descc")
      {
        cancelDescChange();
      }
      if(temp==="prog")
      {
        setAddP(0);
        setBlueF(0);
      }
      if(temp==="domain")
      {
        setAddd(0);
        setBlueF(0);
      }



    }
    const dealConfirm =(temp,temp1)=>{


      if(temp1==="Name")
      {
        changenewName(temp);
      }
      if(temp1==="Descc")
      {
        changeDescription(temp);
      }
      if(temp1==="domain")
      {
        addanewdomain(temp);
      }
      if(temp1==="prog")
      {
        addp(temp);
      }

    }

    const addanewdomain = (temp) =>
    {


      setBlueF(0);
      setAddd(0);
      // alert(tempDomain);
      axios.get(`http://localhost:8000/SingleInstitutePage/${InstituteName1}/programs/${tempDomain}/domains/${temp}/`)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });



    }
    const addp =(temp) =>{


      setBlueF();
      setAddP(0);


      axios.post(`http://localhost:8000/SingleInstitutePage/addProgram/${InstituteName1}/${temp}`)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });


      setAddP(0);


    }
    const changeDescription =(newDescription) =>{
      setDescc(0);
      setIsBlue(false);


      axios.post(`http://localhost:8000/SingleInstitutePage/changedescription/${InstituteName1}/`, {
           description: newDescription
      })
      .then(response => {
        const newName=InstituteName1;
         setInstituteName(newName);
         setDes(newDescription);
        // navigate(`/universitydash/${newName}`);

      })
      .catch(error => {
        console.log(error.response.data);
      });








    }
    const cancelDescChange =() =>
    {
      setDescc(0);
      setIsBlue(false);
    }
    const cancelNameChange =() =>
    {

      setNameEdit(0);
      setIsBlue(false);
    }
    const handleChangeName = () => {

      setNameEdit(1);
      setIsBlue(true);


    }
    const setBlueT =() =>
    {
      setIsBlue(true);
    }

    const setBlueF =() =>
    {
      setIsBlue(false);
    }
    const changedis =() =>
    {

      setDescc(1);
      setBlueT();



    }


    const addDomain =(temp) =>
    {
      setDomain(temp);
      // alert(temp);
      setAddd(1);
      setBlueT();
      // alert(temp);


    }

    const handleImageChange = event => {
      setImage(event.target.files[0]);
    };



    const addProgram = () =>
    {
      setAddP(1);
      setBlueT();

    }

    const handleSubmit = (event) => {
      event.preventDefault();
      const formData = new FormData();
      formData.append('name', 'My Image');
      formData.append('image', image);

      if (image) {

        setBack(image.name);

      }

      imagere(formData);
    }


  const imagere =(formData) =>
  {
    axios.post("http://localhost:8000/upload",formData).then((res)=>{
      console.log( res.data);
    });


    uploadImage();
  }
  const uploadImage =() =>{


    axios.post(`http://localhost:8000/SingleInstitutePage/upload-big-picture/${InstituteName1}`, { back })
  .then(response => {
    setBack("");
  })
  .catch(error => {
    console.log(error);
  });
  }

    return (


      <div>
      <div className={`mainpage ${isBlue ? 'blue' : ''}`}>

      <div className='upper_layer'>
        <Nav/>

        <div className="picturebox" id="picture" picture>

          <div className="studentsInAStudyGroup008Wrapper" id="Pic_Container">
            <img className="studentsInAStudyGroup008Icon" alt="" src={"http://localhost:8000/images/"+BigPicture}/>
          </div>

          <div className="heading" id="Picture_text">
            <p className="yourAcadem">{InstituteName1}</p>
            <div className='editPicture' onClick={handleChangeName}>
            <img src="/editsymbol.png" className='editSymbol' alt="My Image" />
            </div>
          </div>








        </div>
        <button className='backgroundpic' onClick={() => setShowForm(!showForm)}>
        Change Background
      </button>
      {showForm && (
        <div className='backgroundchose'>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="image">Choose an image:</label>
              <input className='addpic' type="file" id="image" onChange={handleImageChange} />
            </div>
            <button className='changebackbutton' onClick={handleSubmit}>Upload</button>
          </form>
        </div>
      )}

        <University_Description name={name} onChangeDescription= {changedis} des={descrip}/>
        <ButtonBar name={name} onAddProgram={addProgram}/>
        <Body name={name} update={isBlue} onAddDomain={addDomain}/>
        {/* <Desc name={name}/>
        <ButtonBar name={name}/>
        <Body name={name}/>  */}

        {/* <SearchGroup />
        <Body /> */}


      </div>




      </div>
      {nameedit===1 && <NameChange onConfirm={dealConfirm} onCancel={dealcancel} />}
      {descc===1 && <DescriptionChange onConfirm={dealConfirm} onCancel={dealcancel}/> }
      {showaddp===1 && <Addaprogram onConfirm={dealConfirm} onCancel={dealcancel}/> }
      {showaddd===1 && <AddADomain onConfirm={dealConfirm} onCancel={dealcancel}/>}


      </div>
    )

}

export default Mainpage;
