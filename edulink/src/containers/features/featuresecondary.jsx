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

  const handleUpArrowClick = () => {
    sliderRef.current.slickPrev();
  };

  const handleDownArrowClick = () => {
    sliderRef.current.slickNext();
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
          <div className='edulink__featuresecondary-box1-header'>
              <div>
                <h2>Recent Programs</h2>
              </div>
              <div>
              <svg onClick={toggleFilterMenu} id="filter-options" data-name="Group 35" xmlns="http://www.w3.org/2000/svg" width="66.58" height="57.184" viewBox="0 0 66.58 57.184">
                <path id="Path_16" data-name="Path 16" d="M-170.816-274.868q7.167,0,14.334,0c1.011,0,2.023.02,3.032-.024.527-.023,1.044.071,1.571.034.56-.04,1.125-.009,1.688-.009h5.025c.667,0,.647-.008.877-.624a8.861,8.861,0,0,1,7.527-6.133,9,9,0,0,1,9.806,6.368.461.461,0,0,0,.519.393c1.524-.011,3.048.006,4.572-.011.387,0,.536.109.529.512q-.031,1.771,0,3.542c.007.409-.151.512-.532.508-1.455-.016-2.911.009-4.366-.014a.683.683,0,0,0-.79.553,9.08,9.08,0,0,1-8.732,6.294,9.07,9.07,0,0,1-8.531-6.292.687.687,0,0,0-.785-.557q-20.966.016-41.932.009a3.9,3.9,0,0,0-.412,0c-.349.037-.48-.083-.473-.459.024-1.235.019-2.471,0-3.707,0-.309.076-.394.39-.393Q-179.158-274.861-170.816-274.868Zm39.725,2.284a4.573,4.573,0,0,0-4.529-4.585,4.615,4.615,0,0,0-4.608,4.551,4.578,4.578,0,0,0,4.533,4.589A4.563,4.563,0,0,0-131.091-272.583Z" transform="translate(187.916 301.197)"/>
                <path id="Path_17" data-name="Path 17" d="M-136.028-34.24c-4.64,0-9.281.006-13.921-.008a.636.636,0,0,0-.723.517,8.825,8.825,0,0,1-6.667,6.088,8.747,8.747,0,0,1-8.4-2.412,8.587,8.587,0,0,1-2.277-3.753.533.533,0,0,0-.615-.437q-6.013.013-12.026.005c-2.292,0-4.585-.007-6.877.006-.363,0-.5-.083-.494-.48.023-1.235.014-2.471-.012-3.706-.008-.364.192-.366.44-.366h9.761c3.031,0,6.062-.006,9.093.009a.67.67,0,0,0,.764-.53,8.843,8.843,0,0,1,7.366-6.208,8.7,8.7,0,0,1,7.288,2.177,8.784,8.784,0,0,1,2.684,4.156c.113.367.343.4.653.4q3.913-.007,7.825,0h19.852c.927,0,.831-.042.832.812q0,1.524,0,3.048c0,.686,0,.686-.667.686Zm-23.343,2.291a4.58,4.58,0,0,0,4.619-4.534,4.613,4.613,0,0,0-4.525-4.6,4.589,4.589,0,0,0-4.635,4.484A4.57,4.57,0,0,0-159.371-31.949Z" transform="translate(188.054 84.575)"/>
                <path id="Path_18" data-name="Path 18" d="M-141.742-506.927h-17.875c-.59,0-1.181.019-1.77-.006a.515.515,0,0,0-.583.439,9.022,9.022,0,0,1-3.236,4.6,8.926,8.926,0,0,1-4.538,1.782,8.741,8.741,0,0,1-4.73-.795,8.915,8.915,0,0,1-4.838-5.485.667.667,0,0,0-.777-.548c-2.553.019-5.107,0-7.661.02-.388,0-.442-.117-.438-.462q.022-1.914-.021-3.829c-.007-.31.17-.219.313-.219,2.595,0,5.19-.011,7.784.013a.706.706,0,0,0,.808-.573,8.9,8.9,0,0,1,7.664-6.237,8.479,8.479,0,0,1,5.544,1.167,8.936,8.936,0,0,1,4.078,5.07.716.716,0,0,0,.825.572q19.358-.018,38.716-.009a3.175,3.175,0,0,0,.37,0c.362-.042.48.113.475.471q-.024,1.812,0,3.624c0,.328-.1.414-.426.413q-6.692-.017-13.384-.009Zm-24.341-2.226a4.636,4.636,0,0,0-4.61-4.613,4.584,4.584,0,0,0-4.522,4.6,4.559,4.559,0,0,0,4.57,4.583A4.62,4.62,0,0,0-166.083-509.153Z" transform="translate(188.209 518.3)"/>
              </svg>
              </div>
              {filterMenuOpen && (
                <div className='filter-menu'>
                  <div className='filter-menu__header'>
                    <h3>Filter</h3>
                    </div>   
                </div>
              )}
          </div>
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
              {institutesData.map(institute => (
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