import React, {useState, useEffect} from 'react'
import './features.css'
import axios from 'axios';

const Features = () => {
  const totalInstitutesDisplay = 6;
  const [activeCategory, setActiveCategory] = useState('University');
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(totalInstitutesDisplay - 1);
  const [slideTransition, setSlideTransition] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [institutesData, setinstitutesData] = useState([]);
  // let filteredData = institutesData.filter(institute => institute.scope.toLowerCase() === activeCategory.toLowerCase());
  let filteredData = institutesData;
  let visibleData = filteredData.slice(startIndex, endIndex + 1);
  
  useEffect(() => {
    axios.get('http://localhost:8000/university')
      .then((response) => {
        console.log('Universities:', response.data);
        
        const filteredInstitutes = response.data.filter(institute => institute.premium === 'false');
        console.log('Premium Institutes:', filteredInstitutes);
  
        setinstitutesData(filteredInstitutes);
      })
      .catch((error) => console.error('Failed to retrieve universities:', error));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (endIndex === filteredData.length - 1) {
        const categories = ['university', 'college', 'school'];
        const index = categories.indexOf(activeCategory);
        if (index === categories.length - 1) {
          setActiveCategory(categories[0]);
        } else {
          setActiveCategory(categories[index + 1]);
        }
        setStartIndex(0);
        setEndIndex(totalInstitutesDisplay - 1);
      } else {
        handleRightArrowClick();
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [startIndex, endIndex, activeCategory]);



  const handleCategoryClick = (category) => {

    setActiveCategory(category);
    setStartIndex(0);
    setEndIndex(totalInstitutesDisplay - 1);
    filteredData = institutesData.filter(institute => institute.scope.toLowerCase() === activeCategory.toLowerCase());
    visibleData = filteredData.slice(startIndex, endIndex + 1);

  };

  const handleLeftArrowClick = () => {
    setStartIndex(Math.max(0, startIndex - totalInstitutesDisplay));
    setEndIndex(Math.max(totalInstitutesDisplay - 1, endIndex - totalInstitutesDisplay));
    setSlideTransition(1);
  };

  const handleRightArrowClick = () => {
    setStartIndex(Math.min(filteredData.length - 1, startIndex + totalInstitutesDisplay));
    setEndIndex(Math.min(filteredData.length - 1, endIndex + totalInstitutesDisplay));
    setSlideTransition(1);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setSlideTransition(0);
    }, 300);
    return () => clearTimeout(timer);
  }, [slideTransition]);

  return (
    <div className="edulink__features">
    <div className="feature-box">
      <h2>Quick Apply to Our Premium Institutes</h2>
      <div className="category-buttons">
        <button className={activeCategory === 'university' ? 'active' : ''} onClick={() => handleCategoryClick('university')}>Universities</button>
        <button className={activeCategory === 'college' ? 'active' : ''} onClick={() => handleCategoryClick('college')}>Colleges</button>
        <button className={activeCategory === 'school' ? 'active' : ''} onClick={() => handleCategoryClick('school')}>Schools</button>
      </div>
      <hr />
      <div className={`institute-list ${slideTransition ? 'slide' : ''}`}>
        {visibleData.map(institute => (
          <div key={institute.id} className="institute-box">
            
            <img src={institute.logo} alt={`${institute.name} logo`} />
            <div className="institute-details">
              <h3>{institute.name}</h3>
              <p>{institute.address}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="arrow-buttons">
        <button disabled={startIndex === 0} onClick={handleLeftArrowClick}>{"<"}</button>
        <button disabled={endIndex === filteredData.length - 1} onClick={handleRightArrowClick}>{">"}</button>
      </div>
    </div>
    </div>
  );
};

export default Features;
