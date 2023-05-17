import React, { useState, useEffect } from 'react';
import './header.css'
import SimpleSlider from './SimpleSlider';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Header = (props) => {
  const imageNames = ["uni7", "uni2", "uni3", "uni4", "uni5", "uni6"]
  const [Institute, setInstitute] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [suggestionIndex, setSuggestionIndex] = useState(0);
  const [suggestionsActive, setSuggestionsActive] = useState(false);
  const history = useNavigate();

  useEffect(() => {
    const delayTimer = setTimeout(() => {
      fetchData();
    }, 2000);

    return () => clearTimeout(delayTimer);
  }, [Institute]);

  const fetchData = async () => {
    const query = Institute.toLowerCase();
    if (query.length >= 4) {
      try {
        const response = await axios.get('http://localhost:8000/fetchInstitutes/auto-suggest', {
          params: {
            query: query,
          },
        });

        const suggestions = response.data.suggestions;

        if (response.status === 500 || suggestions.length === 0) {
          setSuggestions([{ title: 'No results found', url: '', isRegistered: true }]);
        } else {
          setSuggestions(suggestions);
        }
        setSuggestionsActive(true);
      } catch (error) {
        console.error(error);
        setSuggestions([{ title: 'No results found', url: '', isRegistered: true }]);
        // Handle error
      }
    } else {
      setSuggestionsActive(false);
    }
  };

  const handleChange = (e) => {
    setInstitute(e.target.value);
  };

  

  const handleClick = (suggestion) => {
    if (suggestion.isRegistered) {
      window.open(`http://localhost:3000/SingleInstitutePage/${suggestion.url}`, '_blank');
    } else {
      window.open(suggestion.url, '_blank');
    }
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
              style={{ cursor: 'pointer' }}
              className={index === suggestionIndex ? 'active' : ''}
              key={index}
              onClick={() => handleClick(suggestion)}
            >
              {suggestion.title}
            </li>
          );
        })}
      </ul>
    );
    
  };


  return (
    <div className="edulink__header" id="home">

      <div className="edulink__header-content">

        <h1 className="gradient_text">
          “Your Academic Destiny Starts Here”
        </h1>
        <div className='searchbar'>

        <div>
        <input  
            type="text" 
            className='mysearch'
            id="Search_bar_text" 
            placeholder='Search from over 2000+ institutes worldwide'
            value={Institute}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            > 
          </input>
       
          {suggestionsActive && <Suggestions />}
          
        </div>


          {/* <input className='mysearch' placeholder='Search from over 2000+ institutes worldwide'/> */}
          <button onClick={handleKeyDown} className='search'>Search</button>
        </div>
        <div className='explore'>
          Explore endless possibilities with over 2,000 institutions
        </div>




        <div className='temp'>
          <SimpleSlider imageNames={imageNames} />
      </div>





      </div>



    </div>

  )
}

export default Header
