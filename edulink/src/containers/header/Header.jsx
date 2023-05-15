import React from 'react'
import './header.css'
import SimpleSlider from './SimpleSlider';

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
