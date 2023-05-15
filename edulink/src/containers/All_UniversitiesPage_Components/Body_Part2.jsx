import"./Body_Part2.css";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { sharedVariable, setSharedVariable } from './sharedFile.js';


export default function Body_Part2(){

  const [Institute_, setInstitute_] = useState("");
  const [AllInstitutes_, setAllInstitutes_] = useState("");
  const [data_, setData_] = useState([]);

  const [suggestions_, setSuggestions_] = useState([]);
  const [suggestionIndex_, setSuggestionIndex_] = useState(-1);
  const [suggestionsActive_, setSuggestionsActive_] = useState(false);

  useEffect(() => {
    
    axios.get(`http://localhost:8000/university`)
      .then((response) => {
        
        setAllInstitutes_(response.data);

    
      })
      .catch((error) => console.error('Failed to retrieve universities:', error));
  }, []);

  useEffect(() => {
    const names = Array.isArray(AllInstitutes_) ? AllInstitutes_.map((institute) => institute.address) : [];
    setData_(names);

    updateDisplay_("show");
  }, [AllInstitutes_]);


  const showSlidebar=()=> {
    var s = document.getElementById('sliderbar_AllUniPage');
    s.style.display = "flex";
  }

  const hideSlidebar=()=> {
    var s = document.getElementById('sliderbar_AllUniPage');
    s.style.display = "none";
  }



  const handleChange = (e) => {
    
   
    const query = e.target.value.toLowerCase();
    // setValue(query);
    setInstitute_(e.target.value);

    if (query.length > 0) {
      const filterSuggestions = data_.filter(
        (suggestion_) =>
          suggestion_.toLowerCase().indexOf(query) > -1
      );
      setSuggestions_(filterSuggestions);
      setSuggestionsActive_(true);
    } else {
      setSuggestionsActive_(false);
    }
  };

  const handleClick = (e) => {
    setSuggestions_([]);
    // setValue(e.target.innerText);
    setInstitute_(e.target.innerText);
    setSuggestionsActive_(false);
  };


 
  const updateDisplay_ = (display1) => {

    try {
         
          if(suggestions_.length <=0 || Institute_ === "")
          {
            setSuggestions_(data_);
          }

          // console.log("suggestions" + suggestions_)
          const updatedUniversities = suggestions_.map((university) => ({
          name:university,
          display: display1,
          
           }));

           if(suggestions_.length > 0 )
          {
            const filteredNames_ = data_.filter(name => !suggestions_.includes(name));
            const filtered_ = filteredNames_.map((university) => ({
             name:university,
             display: "none",
             
            }));

            // console.log("data" + data_)
            // console.log("filteres" + filteredNames_)
            
              axios.put("http://localhost:8000/university/updateLocationDisplay", filtered_)
              .then((response) => {
              })
              .catch((error) => console.error('Failed to update ', error));
            

            axios.put("http://localhost:8000/university/updateLocationDisplay", updatedUniversities)
            .then((response) => {
            })
            .catch((error) => console.error('Failed to update ', error));
           
          }
          

         

         

        } catch (error) {
          console.error("Failed to update display:", error);
        };
  
  };

  const handleKeyDown = (e) => {
    // UP ARROW
    if (e.keyCode === 38) {
      if (suggestionIndex_ === 0) {
        return;
      }
      setSuggestionIndex_(suggestionIndex_ - 1);
    }
    // DOWN ARROW
    else if (e.keyCode === 40) {
      if (suggestionIndex_ - 1 === suggestions_.length) {
        return;
      }
      setSuggestionIndex_(suggestionIndex_ + 1);
    }
    // ENTER
    else if (e.keyCode === 13) {
      
      if(suggestionIndex_== -1){
        setInstitute_(e.target.value);

      }
      else{
        setInstitute_(suggestions_[suggestionIndex_]);
        setSuggestionIndex_(0);
      }
      
      setSuggestionsActive_(false);

      updateDisplay_("show");
      

     
    }
    // console.log("handlecclick" + suggestions);
   


  };
  const updateCategory = (c) => {
    console.log(c);
    setSharedVariable(c);
  }

  const Suggestions_ = () => {
    
    return (
      <ul className="suggestions">
        {suggestions_.map((suggestion_, index) => {
          return (
            <li
              className={index === suggestionIndex_ ? "active" : ""}
              key={index}
              onClick={handleClick}
            >
              {suggestion_}
            </li>
          );
        })}
      </ul>
    );
  };


    return(

      <div className="Body_Part2_AllUniPage" id="Body" Body>



      
      
      <div className="Slidebar_Filter">
        <h2 className="svgh2_slidebar">Filters</h2>
        <button className="svgBtn_slidebar" onClick={showSlidebar}  >
          <svg width="50px" height="50px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
            <g id="SVGRepo_iconCarrier"> 
            <path d="M14 5C14 3.89543 13.1046 3 12 3C10.8954 3 10 3.89543 10 5M14 5C14 6.10457 13.1046 7 12 7C10.8954 7 10 6.10457 10 5M14 5H20M10 5L4 5M16 12C16 13.1046 16.8954 14 18 14C19.1046 14 20 13.1046 20 12C20 10.8954 19.1046 10 18 10C16.8954 10 16 10.8954 16 12ZM16 12H4M8 19C8 17.8954 7.10457 17 6 17C4.89543 17 4 17.8954 4 19C4 20.1046 4.89543 21 6 21C7.10457 21 8 20.1046 8 19ZM8 19H20" stroke="#040c18" stroke-width="1.5" stroke-linecap="round"></path>
            </g>
          </svg>
        </button>
      </div>

      <div className="sliderbar_AllUniPage" id="sliderbar_AllUniPage" Sidebar>

        <div className="crossBtn">
          {/* <button onClick={this.hideSlidebar}> */}
          <svg onClick={hideSlidebar} fill="#ffffff" width="40px" height="40px" viewBox="0 0 1024 1024" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M697.4 759.2l61.8-61.8L573.8 512l185.4-185.4-61.8-61.8L512 450.2 326.6 264.8l-61.8 61.8L450.2 512 264.8 697.4l61.8 61.8L512 573.8z"></path></g></svg>
          {/* </button> */}
        </div>
        
        <div className="SidebarFilterArea">

          <div className="location" id="Location_Sidebar" Location_Sidebar >
            <h3 className="exploreByLocation" id="Location_mainlabel" Location_mainlabel> Explore By Location </h3>

            <input  
            type="text" 
            className="enterCityOr" 
            id="search_location_text"
            placeholder="Enter City or Country"
            value={Institute_}
            onChange={handleChange}
            onKeyDown={handleKeyDown}> 
            </input> 
            {suggestionsActive_ && <Suggestions_ />}

          </div>

          <div className="category" id="Category_Sidebar">
            <h3 className="exploreByCategory">Explore By Category</h3>
            <div className="points1" id="Category_div" Category_div>
              <ul>

              <li>
                <button onClick={() => updateCategory("public")} className="publicInstitutes" id="category_label" category_label> Public Institutes </button>
              </li>
              
              <li>
              <button onClick={() => updateCategory("private")} className="privateInstitutes" id="category_label" category_label> Private Institutes </button>
              </li>

              <li>
              <button onClick={() => updateCategory("overseas")} className="overseasInstitutes" id="category_label" category_label> Overseas Institutes </button>
              </li>

              </ul>

            </div>
          </div>

          <div className="exploreParent" id="How_To_Apply" How_To_Apply>
            <h3 className="HowToApply" >How to Apply</h3>
              <ul>
                <li>
                <label className="searchForInstitute" id="How_to_apply_label" How_to_apply_label> Search For Institute</label>
                </li>

                <li>
                <label className="createAccount" id="How_to_apply_label" How_to_apply_label> Create Account</label>
                </li>

                <li>
                <label className="gatherInfomation" id="How_to_apply_label" How_to_apply_label> Gather Infomation</label>
                </li>

                <li>
                <label className="applyForInstitute" id="How_to_apply_label" How_to_apply_label> Apply For institute</label>
                </li>

              </ul>

            </div>

        </div>
          
        </div>
       
      
        
      </div>

    );
  }

