import styles from "./SearchGroup.css";
import React from 'react'
import ReactDOM from 'react-dom'

class SearchGroup extends React.Component{
  render(){
    return (

      <div className="searchGroup" id="SearchBar" SearchBar>
  
        
        <h1 className="explore" id="Explore_text_search">
          Explore Institutes
        </h1>

        <div className="Searchbar">
          <input className="searchInstitutes" id="Search_bar_text" placeholder=" Search Institutes"> 
            </input>
            <button className="search" > Search </button>
        </div>
         
        
  
      </div>
    );
  }
}


export default SearchGroup;
