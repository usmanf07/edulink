import React, { useState, useRef } from 'react';
import './featuresecondary.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Featurethird from './featurethird';


const institutesData = [
  {
    id: 1,
    name: 'FAST National University',
    logo: 'myimages/uni1.png',
    program: 'BS Computer Science',
    lastDate: '29 April, 2023',
    updated: '2 mins ago'
  },
  {
    id: 2,
    name: 'Comsats University',
    logo: 'myimages/uni1.png',
    program: 'BS CS, Civil, Electrical',
    lastDate: '2 May, 2023',
    updated: '5 mins ago'
  },
  {
    id: 3,
    name: 'Ethad University',
    logo: 'myimages/uni1.png',
    program: 'BS CS, Civil, Electrical',
    lastDate: '8 May, 2023',
    updated: '7 mins ago'
  },
  {
    id: 4,
    name: 'UET Lahore',
    logo: 'myimages/uni3.png',
    program: 'BS CS',
    lastDate: '10 May, 2023',
    updated: '9 mins ago'
  },
]

const Featuresecondary = () => {

  const sliderRef = useRef(null);
  let visibleData = institutesData;

  const handleUpArrowClick = () => {
    sliderRef.current.slickPrev();
  };

  const handleDownArrowClick = () => {
    sliderRef.current.slickNext();
  };

  const sortByDeadline = () => {
    const sortedData = institutesData.sort((a, b) => {
      const dateA = new Date(a.lastDate);
      const dateB = new Date(b.lastDate);
      return dateA - dateB;
    });
    // Update the institutesData state with the sorted data
   visibleData = sortedData;
  };

  const sortByMostRecent = () => {
    const sortedData = institutesData.sort((a, b) => {
      const dateA = new Date(a.updated);
      const dateB = new Date(b.updated);
      return dateB - dateA;
    });
    // Update the institutesData state with the sorted data
    visibleData = sortedData;
  };

  const sortByMostPopular = () => {
    // const sortedData = institutesData.sort((a, b) => b.id - a.id);
    // // Update the institutesData state with the sorted data
    // setInstitutesData(sortedData);
  };


  const settings = {
    vertical: true,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: false,
    dots: false,
    draggable: false,
    swipe: true,
    touchMove: false,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          vertical: false,
          slidesToShow: 1,
        },
      },
    ],
  };

  const [filterMenuOpen, setFilterMenuOpen] = useState(false);

  const toggleFilterMenu = () => {
    setFilterMenuOpen(!filterMenuOpen);
  };

  return (
    <div className='edulink__featuresecondary'>
        <div className="edulink__featuresecondary-box1">


        <hr></hr>
          <div className='edulink__featuresecondary-institutes'>
            <div onClick={handleUpArrowClick}>
               <svg fill="#000000" version="1.1" id="up-arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 330 330">
                <path id="XMLID_224_" d="M325.606,229.393l-150.004-150C172.79,76.58,168.974,75,164.996,75c-3.979,0-7.794,1.581-10.607,4.394
                l-149.996,150c-5.858,5.858-5.858,15.355,0,21.213c5.857,5.857,15.355,5.858,21.213,0l139.39-139.393l139.397,139.393
                C307.322,253.536,311.161,255,315,255c3.839,0,7.678-1.464,10.607-4.394C331.464,244.748,331.464,235.251,325.606,229.393z"/>
              </svg>
            </div>
            <Slider {...settings} ref={sliderRef}>
              {visibleData.map(institute => (
              <div key={institute.id} className="edulink__featuresecondary-instituteBox-info">
                  <div className="edulink__featuresecondary-instituteBox">
                  <div className="edulink__featuresecondary-institute-details">
                    <img src={institute.logo} alt={`${institute.name} logo`} />
                    <div>
                      <h3>{institute.name}</h3>
                      <h4>{institute.program}</h4>
                    </div>
                  </div>
                  <div className="edulink__featuresecondary-institute-apply">
                    <button>Apply Now!</button>
                    <div>
                      <h3>Last Date to Apply: {institute.lastDate}</h3>
                    </div>
                  </div>
                  </div>
                  <p>Updated: {institute.updated}</p>
              </div>
            ))}
             </Slider>
            <div onClick={handleDownArrowClick}>
               <svg id="down-arrow" fill="#000000" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 330 330">
                <path id="XMLID_224_" d="M325.606,229.393l-150.004-150C172.79,76.58,168.974,75,164.996,75c-3.979,0-7.794,1.581-10.607,4.394
                l-149.996,150c-5.858,5.858-5.858,15.355,0,21.213c5.857,5.857,15.355,5.858,21.213,0l139.39-139.393l139.397,139.393
                C307.322,253.536,311.161,255,315,255c3.839,0,7.678-1.464,10.607-4.394C331.464,244.748,331.464,235.251,325.606,229.393z"/>
              </svg>
            </div>

          </div>
        </div>
        <div className="edulink__featuresecondary-box2">
            <Featurethird />
        </div>
    </div>
  );
};

export default Featuresecondary;
