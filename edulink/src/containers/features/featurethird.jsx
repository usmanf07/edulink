import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './featurethird.css';
import { useLoadScript } from '@react-google-maps/api';

const Featurethird = () => {
  const sliderRef = useRef(null);
  const [universities, setUniversities] = useState([]);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [locationName, setLocationName] = useState('');

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyAD4EitZQW3LhE6Kp1u8-N4oJ5B1pPSiBo',
    libraries: ['places'],
  });

  useEffect(() => {
    // Fetch universities data
    axios.get('http://localhost:8000/university/')
      .then((response) => {
        console.log('Universities:', response.data);
        setUniversities(response.data);
      })
      .catch((error) => console.error('Failed to retrieve universities:', error));
  }, []);

  useEffect(() => {
    if (isLoaded && !loadError) {
      // Get the current location coordinates using browser geolocation
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const currentLocation = { lat: latitude, lng: longitude };
          // Perform geocoding to get the location name
          const geocoder = new window.google.maps.Geocoder();
          geocoder.geocode({ location: currentLocation }, (results, status) => {
            if (status === 'OK' && results && results.length > 0) {
              const formattedAddress = results[0].formatted_address;
              const locationParts = formattedAddress.split(',');
              let locationName = '';
              if (locationParts.length >= 2) {
                locationName = locationParts[1].trim();
              }
              setLocationName(locationName);
            }
          });
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }, [isLoaded, loadError]);
  


  const [currentIndex, setCurrentIndex] = useState(0);

  const handleLeftArrowClick = () => {
    sliderRef.current.slickPrev();
  };

  const handleRightArrowClick = () => {
    sliderRef.current.slickNext();
  };

  const settings = {
    rows: 2,
    slidesToShow: 2,
    slidesToScroll: 4,
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

  return (
    <div className='edulink__featurethird'>
    <div className='edulink__featuresecondary-box1-header'>
        <h2>Nearby Institutes</h2>
        <div>
      {locationName ? (
        <h4> {locationName}</h4>
      ) : (
        <div>Loading...</div>
      )}
    </div>
       
        <div>
        <svg  id="filter-options" data-name="Group 35" xmlns="http://www.w3.org/2000/svg" width="66.58" height="57.184" viewBox="0 0 66.58 57.184">
        <path id="Path_16" data-name="Path 16" d="M-170.816-274.868q7.167,0,14.334,0c1.011,0,2.023.02,3.032-.024.527-.023,1.044.071,1.571.034.56-.04,1.125-.009,1.688-.009h5.025c.667,0,.647-.008.877-.624a8.861,8.861,0,0,1,7.527-6.133,9,9,0,0,1,9.806,6.368.461.461,0,0,0,.519.393c1.524-.011,3.048.006,4.572-.011.387,0,.536.109.529.512q-.031,1.771,0,3.542c.007.409-.151.512-.532.508-1.455-.016-2.911.009-4.366-.014a.683.683,0,0,0-.79.553,9.08,9.08,0,0,1-8.732,6.294,9.07,9.07,0,0,1-8.531-6.292.687.687,0,0,0-.785-.557q-20.966.016-41.932.009a3.9,3.9,0,0,0-.412,0c-.349.037-.48-.083-.473-.459.024-1.235.019-2.471,0-3.707,0-.309.076-.394.39-.393Q-179.158-274.861-170.816-274.868Zm39.725,2.284a4.573,4.573,0,0,0-4.529-4.585,4.615,4.615,0,0,0-4.608,4.551,4.578,4.578,0,0,0,4.533,4.589A4.563,4.563,0,0,0-131.091-272.583Z" transform="translate(187.916 301.197)"/>
        <path id="Path_17" data-name="Path 17" d="M-136.028-34.24c-4.64,0-9.281.006-13.921-.008a.636.636,0,0,0-.723.517,8.825,8.825,0,0,1-6.667,6.088,8.747,8.747,0,0,1-8.4-2.412,8.587,8.587,0,0,1-2.277-3.753.533.533,0,0,0-.615-.437q-6.013.013-12.026.005c-2.292,0-4.585-.007-6.877.006-.363,0-.5-.083-.494-.48.023-1.235.014-2.471-.012-3.706-.008-.364.192-.366.44-.366h9.761c3.031,0,6.062-.006,9.093.009a.67.67,0,0,0,.764-.53,8.843,8.843,0,0,1,7.366-6.208,8.7,8.7,0,0,1,7.288,2.177,8.784,8.784,0,0,1,2.684,4.156c.113.367.343.4.653.4q3.913-.007,7.825,0h19.852c.927,0,.831-.042.832.812q0,1.524,0,3.048c0,.686,0,.686-.667.686Zm-23.343,2.291a4.58,4.58,0,0,0,4.619-4.534,4.613,4.613,0,0,0-4.525-4.6,4.589,4.589,0,0,0-4.635,4.484A4.57,4.57,0,0,0-159.371-31.949Z" transform="translate(188.054 84.575)"/>
        <path id="Path_18" data-name="Path 18" d="M-141.742-506.927h-17.875c-.59,0-1.181.019-1.77-.006a.515.515,0,0,0-.583.439,9.022,9.022,0,0,1-3.236,4.6,8.926,8.926,0,0,1-4.538,1.782,8.741,8.741,0,0,1-4.73-.795,8.915,8.915,0,0,1-4.838-5.485.667.667,0,0,0-.777-.548c-2.553.019-5.107,0-7.661.02-.388,0-.442-.117-.438-.462q.022-1.914-.021-3.829c-.007-.31.17-.219.313-.219,2.595,0,5.19-.011,7.784.013a.706.706,0,0,0,.808-.573,8.9,8.9,0,0,1,7.664-6.237,8.479,8.479,0,0,1,5.544,1.167,8.936,8.936,0,0,1,4.078,5.07.716.716,0,0,0,.825.572q19.358-.018,38.716-.009a3.175,3.175,0,0,0,.37,0c.362-.042.48.113.475.471q-.024,1.812,0,3.624c0,.328-.1.414-.426.413q-6.692-.017-13.384-.009Zm-24.341-2.226a4.636,4.636,0,0,0-4.61-4.613,4.584,4.584,0,0,0-4.522,4.6,4.559,4.559,0,0,0,4.57,4.583A4.62,4.62,0,0,0-166.083-509.153Z" transform="translate(188.209 518.3)"/>
        </svg>
        </div>
    </div>
    <hr></hr>
    <div className="featurethird__content" >
    <svg onClick={handleLeftArrowClick} fill="#000000" id="left-arrow" version="1.1"  xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 330 330">
        <path id="XMLID_222_" d="M250.606,154.389l-150-149.996c-5.857-5.858-15.355-5.858-21.213,0.001
        c-5.857,5.858-5.857,15.355,0.001,21.213l139.393,139.39L79.393,304.394c-5.857,5.858-5.857,15.355,0.001,21.213
        C82.322,328.536,86.161,330,90,330s7.678-1.464,10.607-4.394l149.999-150.004c2.814-2.813,4.394-6.628,4.394-10.606
        C255,161.018,253.42,157.202,250.606,154.389z"/>
    </svg>

        <div className="featurethird__institutes">
          <div className='featurethird__institutes_newdiv'>
          <Slider {...settings} ref={sliderRef}>
  {universities.map((institute) => {
    const randomValue = Math.floor(Math.random() * 10) + 1; // Generate a random value between 1-10

    return (
      <div key={institute._id} className="featurethird__institutebox">
        <img src={`http://localhost:8000/logos/${institute.logo}`} alt={`${institute.name} logo`} />
        <div>
          <h3>{institute.name}</h3>
          <h4>{institute.address}</h4>
          <p>{randomValue + "km"}</p>
        </div>
      </div>
    );
  })}
</Slider>
           </div>
        </div>

            <svg onClick={handleRightArrowClick} fill="#000000" id="right-arrow" version="1.1"  xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 330 330">
            <path id="XMLID_222_" d="M250.606,154.389l-150-149.996c-5.857-5.858-15.355-5.858-21.213,0.001
            c-5.857,5.858-5.857,15.355,0.001,21.213l139.393,139.39L79.393,304.394c-5.857,5.858-5.857,15.355,0.001,21.213
            C82.322,328.536,86.161,330,90,330s7.678-1.464,10.607-4.394l149.999-150.004c2.814-2.813,4.394-6.628,4.394-10.606
            C255,161.018,253.42,157.202,250.606,154.389z"/>
        </svg>
    </div>

    </div>
  )
}

export default Featurethird;
