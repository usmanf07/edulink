import React, { useState, useEffect } from 'react';
import './features.css';

const institutesData = [
  {
    id: 1,
    name: 'Example University',
    location: 'New York, NY',
    logo: 'myimages/uni1.png',
    category: 'Universities'
  },
  {
    id: 2,
    name: 'Example College',
    location: 'Los Angeles, CA',
    logo: 'myimages/uni1.png',
    category: 'Colleges'
  },
  {
    id: 3,
    name: 'Example School',
    location: 'Chicago, IL',
    logo: 'myimages/uni1.png',
    category: 'Schools'
  },
  {
    id: 4,
    name: 'Example School',
    location: 'Chicago, IL',
    logo: 'myimages/uni1.png',
    category: 'Schools'
  },
  {
    id: 5,
    name: 'Example School',
    location: 'Chicago, IL',
    logo: 'myimages/uni1.png',
    category: 'Schools'
  },
  {
    id: 6,
    name: 'Fast University',
    location: 'Lahore, PK',
    logo: 'myimages/uni2.png',
    category: 'Universities'
  },
  // Add more institutes as needed
];

const Features = () => {
  const [activeCategory, setActiveCategory] = useState('Universities');
  const [sliderPosition, setSliderPosition] = useState(0);
  const sliderWidth = 200; // adjust as needed

  useEffect(() => {
    const intervalId = setInterval(() => {
      const filteredInstitutes = institutesData.filter((institute) => institute.category === activeCategory);
      if (sliderPosition >= (filteredInstitutes.length - 1) * sliderWidth) {
        setSliderPosition(0);
      } else {
        setSliderPosition(sliderPosition + sliderWidth);
      }
    }, 2000);
    return () => clearInterval(intervalId);
  }, [activeCategory, sliderPosition, sliderWidth]);

  const handleCategoryClick = (category) => {
      setActiveCategory(category);
      setSliderPosition(0); // reset the slider position when category is changed
  };

{institutesData
  .filter((institute) => institute.category === activeCategory)
  .map((institute) => (
    <div className="institute" key={institute.id}>
      <img src={institute.logo} alt={institute.name} />
      <div className="institute-details">
        <h3 className="institute-name">{institute.name}</h3>
        <p className="institute-location">{institute.location}</p>
      </div>
    </div>
  ))}


  const handleSliderClick = (direction) => {
    if (direction === 'left') {
      setSliderPosition(sliderPosition - sliderWidth);
    } else if (direction === 'right') {
      setSliderPosition(sliderPosition + sliderWidth);
    }
  };

  return (
    <div className="feature-box">
      <div className="feature-box-header">
        <h2>Quick Apply to Our Premium Institute</h2>
        <div className="categories">
          <button
            className={activeCategory === 'Universities' ? 'active' : ''}
            onClick={() => handleCategoryClick('Universities')}
          >
            Universities
          </button>
          <button
            className={activeCategory === 'Colleges' ? 'active' : ''}
            onClick={() => handleCategoryClick('Colleges')}
          >
            Colleges
          </button>
          <button
            className={activeCategory === 'Schools' ? 'active' : ''}
            onClick={() => handleCategoryClick('Schools')}
          >
            Schools
          </button>
        </div>
      </div>
      <div className="feature-box-content">
        <div className="institutes-slider">
          <button
            className="slider-button left"
            onClick={() => handleSliderClick('left')}
            disabled={sliderPosition === 0}
          >
            &#x2190;
          </button>
          <div className="slider-frame">
            <div
              className="slider"
              style={{ transform: `translateX(-${sliderPosition}px)` }}
            >
              {institutesData.filter((institute) => institute.category === activeCategory)
              .map((institute) => (
                <div className="institute" key={institute.id}>
                  <img src={institute.logo} alt={institute.name} />
                  <div className="institute-details">
                    <h3 className="institute-name">{institute.name}</h3>
                    <p className="institute-location">{institute.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button
            className="slider-button right"
            onClick={() => handleSliderClick('right')}
            disabled={sliderPosition === (institutesData.filter((institute) => institute.category === activeCategory).length - 1) * sliderWidth}
          >
            &#x2192;
          </button>
        </div>
      </div>
    </div>
  );
};

export default Features;
