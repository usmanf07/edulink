import React from 'react'
import './header.css'
import SimpleSlider from './SimpleSlider';


const Header = () => {
  const imageNames = ["uni7", "uni2", "uni3", "uni4", "uni5", "uni6"]
  return (
    <div className="edulink__header" id="home">


      <div className="edulink__header-content">
        <h1 className="gradient_text">
          “Your Academic Destiny Starts Here”
        </h1>
        <div className='searchbar'>
          <input className='mysearch' placeholder='Search from over 2000+ institutes worldwide'/>
          <button className='search'>Search</button>
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
