import styles from "./SearchGroup.css";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom'
import moment from 'moment/moment.js';


export default function SearchGroup(){

  const [Institute, setInstitute] = useState("");
  const [AllInstitutes, setAllInstitutes] = useState("");
  const [data, setData] = useState([]);
  
  const [suggestions, setSuggestions] = useState([]);
  const [suggestionIndex, setSuggestionIndex] = useState(-1);
  const [suggestionsActive, setSuggestionsActive] = useState(false);
  const [displayShow, setdisplayShow] = useState("");

  useEffect(() => {
    
    axios.get(`http://localhost:8000/university`)
      .then((response) => {
        
        setAllInstitutes(response.data);
      })
      .catch((error) => console.error('Failed to retrieve universities:', error));
  }, []);

  useEffect(() => {
    const names = Array.isArray(AllInstitutes) ? AllInstitutes.map((institute) => institute.name) : [];
    setData(names);
    setSuggestions(names);
    // console.log(names);
    updateDisplay("show");
  }, [AllInstitutes]);



  const handleChange = (e) => {
    
   
    const query = e.target.value.toLowerCase();
    // setValue(query);
    setInstitute(e.target.value);

    if (query.length > 3) {
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


 
  const updateDisplay = (display1) => {

    try {

          console.log(Institute);
          if(suggestions.length <=0 || Institute == "")
          {
            setSuggestions(data);
          }
          const updatedUniversities = suggestions.map((university) => ({
          name:university,
          display: display1,
          
           }));

           if(suggestions.length > 0 )
          {
            const filteredNames = data.filter(name => !suggestions.includes(name));
            const filtered = filteredNames.map((university) => ({
             name:university,
             display: "none",
             
            }));

            axios.put("http://localhost:8000/university/updateDisplay", filtered)
            .then((response) => {
            })
            .catch((error) => console.error('Failed to update ', error));
          }
          

          axios.put("http://localhost:8000/university/updateDisplay", updatedUniversities)
          .then((response) => {
          })
          .catch((error) => console.error('Failed to update ', error));

         

        } catch (error) {
          console.error("Failed to update display:", error);
        };
  
  };

  const handleKeyDown = (e) => {

    var topSuggestions;
    if(suggestions.length > 4){
      topSuggestions = suggestions.slice(0, 4);
    }
    else{
      topSuggestions = suggestions.slice(0,suggestions.length );
    }
    
    // alert(topSuggestions.length);
    // UP ARROW
    if (e.keyCode === 38) {
      if (suggestionIndex === 0) {
        return;
      }
      setSuggestionIndex(suggestionIndex-1);

    }
    // DOWN ARROW
    else if (e.keyCode === 40) {
      if (suggestionIndex + 1 === topSuggestions.length) {
        return;
      }
      setSuggestionIndex(suggestionIndex+1);
    }
    // ENTER
    // else if (e.keyCode === 13) {
      
    //   if(suggestionIndex == -1){
    //     setInstitute(e.target.value);

    //   }
    //   else{
    //     setInstitute(suggestions[suggestionIndex]);
    //     setSuggestionIndex(0);
    //   }
      
    //   setSuggestionsActive(false);

     
    // }
    else if (e.keyCode === 13) {

      setInstitute(topSuggestions[suggestionIndex]);
      // setSuggestionIndex(0);
      setSuggestionsActive(false);
    }
    else if(e.target.innerText == "Search" ){
      setSuggestionsActive(false);

    }

  };
  const Suggestions = () => {
    const topSuggestions = suggestions.slice(0, 4);
    return (
      <ul className="suggestions">
        {topSuggestions.map((suggestion, index) => {
          return (
            <li
              className={index === suggestionIndex ? 'active' : ''}
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

    return (

      <div className="searchGroup" id="SearchBar" SearchBar>
  
        
        <h1 className="explore_Inst" id="Explore_text_search">
          Explore Institutes
        </h1>



        <div className="Searchbar">
          <div>
          <input  
            type="text" 
            className="searchInstitutes" 
            id="Search_bar_text" 
            placeholder="Search institutes..."
            value={Institute}
            onChange={handleChange}
            onKeyDown={handleKeyDown}> 
          </input>
          {suggestionsActive && <Suggestions />}
          </div>
         
          <button onClick={handleKeyDown} className="search_Btn" > Search </button>
        </div>
  
      </div>
    );
  }


