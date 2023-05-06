import React,{useState} from 'react'
import FileUploader from './Upload';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Preview from './Preview';

export default function InstituteLocation({onNext}) {


  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [completeAddress, setcompleteAddress] = useState("");
  const [location, setLocation] = useState("Location...");
  const [uploadPictures,setuploadPictures] = useState("");
  const [File, setFiles] = useState("");

  const onSuccess = (savedFiles) => {
    setFiles(savedFiles)
};


  function handleLocationChange(event) {
    setLocation(event.target.value);
  }
  


  // const handleNext = (e) => {
  //   e.preventDefault();
  //   onNext({ country, city, postalCode ,completeAddress,location});

  // };


  const handleSubmit = (e) => {
    e.preventDefault();
   
      document.getElementById("Country").textContent = "Select Country:";
      document.getElementById("City").textContent = "Select City:";
      document.getElementById("postalCode").textContent = "Enter Postal Code:";
      document.getElementById("completeAddress").textContent = "Enter Complete Address:";
      document.getElementById("GoogleMap").textContent = "Select Google Map Location:";

      if(country.length < 1){
        document.getElementById("Country").textContent = "Please select any option:";
      }
      else if(city.length < 1)
      {
        document.getElementById("City").textContent = "Please select any option:";
      }
      else if(postalCode.length < 1)
      {
        document.getElementById("postalCode").textContent = "Please write correct postal code";
      }
      else if(completeAddress.length < 10)
      {
        document.getElementById("completeAddress").textContent = "Please write correct completeAddress";
      }
      else if((location.length < 3) || (location.textContent == "Location..."))
      {
        document.getElementById("GoogleMap").textContent = "Please write correct GoogleMap location";
      }else{
        onNext({ country, city, postalCode ,completeAddress,location});
      }


  };

  
  return (
    <div className='sign'>

    <div>
      <h1>
        Sign Up
      </h1>
    </div>


    <div className='information'>
    <form onSubmit={handleSubmit}>
    <label id="Country" htmlFor="country">Select Country:</label>
      <select id="country" value={country} onChange={(e) => setCountry(e.target.value)}>
        <option  value="">--Select Country--</option>
        <option value="Pakistan">Pakistan</option>
        <option value="India">India</option>
        <option value="Afghanistan">Afghanistan</option>
      </select>


      <br />
      <label id="City" htmlFor="city">Select City:</label>
      <select id="city" value={city} onChange={(e) => setCity(e.target.value)}>
        <option value="">--Select City--</option>
        <option value="Karachi">Karachi</option>
        <option value="Lahore">Lahore</option>
        <option value="Islamabad">Islamabad</option>
        <option value="Rawalpindi">Rawalpindi</option>
        <option value="Faisalabad">Faisalabad</option>
      </select>

      <br />
      <label id="postalCode" htmlFor="postalCode">Enter Postal Code:</label>
      <input id="postalCode" type="text" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} />
      <br />

      <label id="completeAddress" htmlFor="completeAddress">Enter Complete Address:</label>
      <input id="completeAddress" type="text" value={completeAddress} onChange={(e) => setcompleteAddress(e.target.value)} />
      <br />

      <label id="GoogleMap" htmlFor="GoogleMap">Select Google Map Location:</label>
      <br />
      <iframe className="gmap_iframe" src={`https://maps.google.com/maps?q=${location}&output=embed`} ></iframe>
      <input type="text" id="locationInput" value={location} onChange={handleLocationChange} />
      <br />
      <br />
      <br />

      <label id="uploadPictures" htmlFor="uploadPictures">Upload 3-4 Pictures of Institute:</label>
      <FileUploader onSuccess={onSuccess}/>
      <Preview files={File}/>
      <ToastContainer/>
      <br />

   



      <button className='next' >Next</button>
      </form>  

    </div>
    </div>
  )
}
