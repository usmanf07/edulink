import React,{useState} from 'react'
import Autosuggest from 'react-autosuggest';
import { autoCompleteData } from "./data.js";
import addmorebtn from '../assets/addmore_btn.png';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment/moment.js';

export default function Signup4({onNext}) {

  const [Institute, setInstitute] = useState("");
  const [Degree, setDegree] = useState("");
  const [FieldOfStudy, setFieldOfStudy] = useState("");
  const [StartYear, setStartYear] = useState("");
  const [EndYear, setEndYear] = useState("");

  var data = autoCompleteData;
  var maxDate = new Date("12/30/2030");
  var minDate = new Date("01/01/1970");

  //Auto Suggestion......

  const [suggestions, setSuggestions] = useState([]);
  const [suggestionIndex, setSuggestionIndex] = useState(-1);
  const [suggestionsActive, setSuggestionsActive] = useState(false);

  const handleChange = (e) => {
    const query = e.target.value.toLowerCase();
    // setValue(query);
    setInstitute(e.target.value);

    if (query.length > 0) {
      const filterSuggestions = data.filter(
        (suggestion) =>
          suggestion.toLowerCase().indexOf(query) > -1
      );
      setSuggestions(filterSuggestions);
      setSuggestionsActive(true);
    } else {
      setSuggestionsActive(false);
    }
  };

  const handleClick = (e) => {
    setSuggestions([]);
    // setValue(e.target.innerText);
    setInstitute(e.target.innerText);
    setSuggestionsActive(false);
  };

  const handleKeyDown = (e) => {
    // UP ARROW
    if (e.keyCode === 38) {
      if (suggestionIndex === 0) {
        return;
      }
      setSuggestionIndex(suggestionIndex - 1);
    }
    // DOWN ARROW
    else if (e.keyCode === 40) {
      if (suggestionIndex - 1 === suggestions.length) {
        return;
      }
      setSuggestionIndex(suggestionIndex + 1);
    }
    // ENTER
    else if (e.keyCode === 13) {
      
      if(suggestionIndex == -1){
        setInstitute(e.target.value);

      }
      else{
        setInstitute(suggestions[suggestionIndex]);
        setSuggestionIndex(0);
      }
      
      setSuggestionsActive(false);

     
    }
  };

  const Suggestions = () => {
    return (
      <ul className="suggestions">
        {suggestions.map((suggestion, index) => {
          return (
            <li
              className={index === suggestionIndex ? "active" : ""}
              key={index}
              onClick={handleClick}
            >
              {suggestion}
            </li>
          );
        })}
      </ul>
    );
  };

 

  const handleSubmit = (e) => {
    e.preventDefault();
    // alert(Institute.length);

    // if(Institute){

      document.getElementById("InstituteLabel").textContent = "Institute:";
      document.getElementById("DegreeLabel").textContent = "Degree:";
      document.getElementById("FieldOfStudyLabel").textContent = "Field Of Study:";
      document.getElementById("StartYearLabel").textContent = "Starting Date:";
      document.getElementById("EndYearLabel").textContent = "Ending Date:";

      const startDate = moment(StartYear);
      const timeEnd = moment(EndYear);
      const diff = timeEnd.diff(startDate);


      if(Institute.length <= 0  ){
        var inst = document.getElementById("InstituteLabel");
        inst.style.color = 'red';
        inst.textContent = 'Please write institute name correctly';
        return;
        
      }
      else if(Degree.length < 2){
      var inst = document.getElementById("DegreeLabel");
      inst.style.color = 'red';
      inst.textContent = 'Degree name should be at least 2 characters';
      return;
      
    }
    else if(FieldOfStudy.length < 2){
      var inst = document.getElementById("FieldOfStudyLabel");
      inst.style.color = 'red';
      inst.textContent = 'Field name should be at least 2 characters';
      return;
      
    }
    else if(StartYear.length <= 0){
      var inst = document.getElementById("StartYearLabel");
      inst.style.color = 'red';
      inst.textContent = 'Kindly select appropriate date';
      return;
      
    }
    else if(EndYear.length <= 0){
      var inst = document.getElementById("EndYearLabel");
      inst.style.color = 'red';
      inst.textContent = 'Kindly select appropriate date';
      return;
      
    }
    else if(diff <= 0){
        var inst = document.getElementById("EndYearLabel");
        inst.style.color = 'red';
        inst.textContent = 'Kindly select date greater than start time';
        return;
      
    }
    else{
    onNext({ Institute, Degree, FieldOfStudy,StartYear,EndYear });

    }

  };

  return (
   <div className='sign'>
      <div><h1> Sign Up</h1><br></br></div>

    
      <div className='information'>
      <div><h2> Educational information</h2><br></br></div>
      <form onSubmit={handleSubmit}>

      <label id="InstituteLabel" htmlFor="Institute">Institute:</label>
      <div className="autocomplete">
      <input 
        type="text"
        value={Institute}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      {suggestionsActive && <Suggestions />}
      </div>
      <br />

      <label id="DegreeLabel" htmlFor="Degree">Degree:</label>
      <input id="Degree" type="text" value={Degree} onChange={(e) => setDegree(e.target.value)} />
      <br />

      <label id="FieldOfStudyLabel" htmlFor="FieldOfStudy">Field Of Study:</label>
      <input id="FieldOfStudy" type="text" value={FieldOfStudy} onChange={(e) => setFieldOfStudy(e.target.value)} />
      <br />

      <label id="StartYearLabel" htmlFor="StartYear">Starting Date:</label>
      <DatePicker selected={StartYear} onChange={(date) => setStartYear(date)}
      maxDate={maxDate}
      minDate={minDate}
       />
      {/* <input id="StartYear" type="text" value={StartYear} onChange={(e) => setStartYear(e.target.value)} /> */}
      <br />

      <label id="EndYearLabel" htmlFor="EndYear">End Date</label>
      <DatePicker selected={EndYear} onChange={(date) => setEndYear(date)}
      maxDate={maxDate}
      minDate={minDate}
       />
      {/* <input id="EndYear" type="text" value={EndYear} onChange={(e) => setEndYear(e.target.value)} /> */}
      <br />

     {/* <div className='addmorediv'>
     <button className="addmorebtn" onClick={addMoreInformation}><img className='addmorebtnimg' src={addmorebtn}></img></button>
     <label className="AddmoreText">Want to add more educational information</label>
     </div> */}
      

      <button type="submit" className='next'>Next</button>
      </form>
      </div>
    




    </div>
  )
}

