import React,{useState} from 'react'

export default function Signup2({onNext}) {


  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");

  const handleNext = (e) => {
    e.preventDefault();
    onNext({ country, city, postalCode });

  };

  return (
    <div className='sign'>

    <div>
      <h1>
        Sign Up
      </h1>
    </div>


    <div className='information'>

    <label htmlFor="country">Select Country:</label>
    <select id="country" value="" onChange={(e) => setCountry(e.target.value)}>
       <option value="">--Select Country--</option>
        <option value="Pakistan">Pakistan</option>
      </select>


      <br />
      <label htmlFor="city">Select City:</label>
      <select id="city" value={city} onChange={(e) => setCity(e.target.value)}>
        <option value="">--Select City--</option>
        <option value="Karachi">Karachi</option>
        <option value="Lahore">Lahore</option>
        <option value="Islamabad">Islamabad</option>
        <option value="Rawalpindi">Rawalpindi</option>
        <option value="Faisalabad">Faisalabad</option>
      </select>

      <br />
      <label htmlFor="postalCode">Enter Postal Code:</label>
      <input id="postalCode" type="text" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} />
      <br />
      <button className='next' onClick={handleNext}>Next</button>







    </div>












    </div>
  )
}
