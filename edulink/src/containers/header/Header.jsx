import React, { useState, useEffect } from 'react';
import './header.css'
import SimpleSlider from './SimpleSlider';


const data = ["FAST National University","FAST NUCES Islamabad","FAST-NUCES | Karachi","Comsats", "Lahore University","NUST Islamabad", "LUMS","UET Lahore"];


const institutes = [
  {
      "title": "FAST National University",
      "link": "https://www.nu.edu.pk/",
      "snippet": "Premier University of Pakistan ... Why FAST? ... The university has five modern campuses at Karachi, Lahore, Islamabad, Peshawar and Chiniot-Faisalabad.",
      "logo": "https://www.nu.edu.pk/Content/images/Slider/background.jpg"
  },
  {
      "title": "FAST NUCES Islamabad",
      "link": "http://isb.nu.edu.pk/",
      "snippet": "Campus Life · Recent News · Recent Events.",
      "logo": "http://isb.nu.edu.pk/assets/Images/Services/OneStop.png"
  },
  {
      "title": "FAST-NUCES | Karachi",
      "link": "https://khi.nu.edu.pk/",
      "snippet": "The students who come to university on their car or motorcycles can park their vehicles in the Main Campus parking area just outside the main gate of FAST NUCES ...",
      "logo": "https://khi.nu.edu.pk/wp-content/uploads/slider/cache/eeceb9177b46bbdf56a3c6423ee9a1fc/Image-37_-scaled.jpg"
  }
]

const Header = (props) => {
  const imageNames = ["uni7", "uni2", "uni3", "uni4", "uni5", "uni6"]
  const [Institute, setInstitute] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [suggestionIndex, setSuggestionIndex] = useState(0);
  const [suggestionsActive, setSuggestionsActive] = useState(false);


  const handleChange = (e) => {
    
      const query = e.target.value.toLowerCase();
      // setValue(query);
      setInstitute(e.target.value);
  
      if (query.length >= 4) {
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
