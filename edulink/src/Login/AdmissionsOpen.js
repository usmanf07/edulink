import React,{useState} from 'react'
import Autosuggest from 'react-autosuggest';
import { autoCompleteData } from "./data.js";
import addmorebtn from '../assets/addmore_btn.png';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment/moment.js';

export default function AdmissionsOpen({onNext}) {

  const [ProgramName, setProgramName] = useState("");
  const [Deadline, setDeadline] = useState("");
  

  var data = autoCompleteData;
  var maxDate = new Date("12/30/2030");
  var minDate = new Date();
  

  //Auto Suggestion......

  const [suggestions, setSuggestions] = useState([]);
  const [suggestionIndex, setSuggestionIndex] = useState(-1);
  const [suggestionsActive, setSuggestionsActive] = useState(false);
  const [value, setValue] = useState("");

  const handleChange = (e) => {
    const query = e.target.value.toLowerCase();
    // setValue(query);
    setProgramName(e.target.value);

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
    setProgramName(e.target.innerText);
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
        setProgramName(e.target.value);

      }
      else{
        setProgramName(suggestions[suggestionIndex]);
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

  const addMoreInformation = (e)=>{

  }

  const handleSubmit = (e) => {
    e.preventDefault();

    document.getElementById("ProgramName").textContent = "Program Name:";
    document.getElementById("Deadline").textContent = "Deadline:";

    if(ProgramName.length <= 0  ){

        var inst = document.getElementById("ProgramName");
        inst.style.color = 'red';
        inst.textContent = 'Please write Program Name name correctly';
        return;
    }
    else if((Deadline) && Deadline.length <= 7 ){

        var inst = document.getElementById("Deadline");
        inst.style.color = 'red';
        inst.textContent = 'Kindly select appropriate date';
        return;
        
    }
    else{
        onNext({ ProgramName, Deadline });
    }
      
  };

  return (
   <div className='sign'>
      <div><h1> Sign Up</h1><br></br></div>

    
      <div className='information'>
      <div><h2> Admissions Open?</h2><br></br></div>
      <form onSubmit={handleSubmit}>

      <label id="ProgramName" htmlFor="ProgramName">Program Name:</label>
      <div className="autocomplete">
      <input 
        type="text"
        value={ProgramName}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      {suggestionsActive && <Suggestions />}
      </div>
      <br />

     

      <label id="Deadline" htmlFor="Deadline">Deadline:</label>
      <DatePicker selected={Deadline} onChange={(date) => setDeadline(date)}
      maxDate={maxDate}
      minDate={minDate}
       />
     
      <br />

      
     <div className='addmorediv'>
     <button className="addmorebtn" onClick={addMoreInformation}><img className='addmorebtnimg' src={addmorebtn}></img></button>
     <label className="AddmoreText">Want to add more Admissions Open?</label>
     </div>
      

      <button type="submit" className='next'>Next</button>
      </form>
      </div>
    




    </div>
  )
}

