import styles from "./SearchGroup.css";
import React from 'react'
import ReactDOM from 'react-dom'

class SearchGroup extends React.Component{
  render(){
    return (

      <div className="searchGroup" id="SearchBar" SearchBar>
  
        
        <h1 className="explore_Inst" id="Explore_text_search">
          Explore Institutes
        </h1>

        <div className="Searchbar">
          <input className="searchInstitutes" id="Search_bar_text" placeholder="Search institutes..."> 
            </input>
            <button className="search_Btn" > Search </button>
        </div>

        {/* <h1 className="gradient_text">
          Explore Institutes
        </h1>
        <div className='searchbar'>
          <input className='mysearch' placeholder='Search from over 2000+ institutes worldwide'/>
          <button className='search'>Search</button>
        </div>
         
         */}
  
      </div>
    );
  }
}


export default SearchGroup;
