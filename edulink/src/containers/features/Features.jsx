import React, {useState, useEffect} from 'react'
import './features.css'

const institutesData = [
  {
    id: 1,
    name: 'Example University 1',
    location: 'New York, NY',
    logo: 'myimages/uni1.png',
    category: 'Universities'
  },
  {
    id: 2,
    name: 'Example University 2',
    location: 'New York, NY',
    logo: 'myimages/uni1.png',
    category: 'Universities'
  },
  {
    id: 3,
    name: 'Example University 3',
    location: 'New York, NY',
    logo: 'myimages/uni1.png',
    category: 'Universities'
  },
  {
    id: 4,
    name: 'Example University 4',
    location: 'New York, NY',
    logo: 'myimages/uni1.png',
    category: 'Universities'
  },
  {
    id: 5,
    name: 'Example University 5',
    location: 'New York, NY',
    logo: 'myimages/uni1.png',
    category: 'Universities'
  },
  {
    id: 6,
    name: 'Example University 6',
    location: 'New York, NY',
    logo: 'myimages/uni1.png',
    category: 'Universities'
  },
  {
    id: 7,
    name: 'Example University 7',
    location: 'New York, NY',
    logo: 'myimages/uni1.png',
    category: 'Universities'
  },
  {
    id: 8,
    name: 'Example University 8',
    location: 'New York, NY',
    logo: 'myimages/uni1.png',
    category: 'Universities'
  },
  {
    id: 25,
    name: 'Example University 9',
    location: 'New York, NY',
    logo: 'myimages/uni1.png',
    category: 'Universities'
  },
  {
    id: 26,
    name: 'Example University 10',
    location: 'New York, NY',
    logo: 'myimages/uni1.png',
    category: 'Universities'
  },
  {
    id: 27,
    name: 'Example University 11',
    location: 'New York, NY',
    logo: 'myimages/uni1.png',
    category: 'Universities'
  },
  //Colleges
  {
    id: 9,
    name: 'Example College 1',
    location: 'New York, NY',
    logo: 'myimages/uni1.png',
    category: 'Colleges'
  },
  {
    id: 10,
    name: 'Example College 2',
    location: 'New York, NY',
    logo: 'myimages/uni1.png',
    category: 'Colleges'
  },
  {
    id: 11,
    name: 'Example College 3',
    location: 'New York, NY',
    logo: 'myimages/uni1.png',
    category: 'Colleges'
  },
  {
    id: 12,
    name: 'Example College 4',
    location: 'New York, NY',
    logo: 'myimages/uni1.png',
    category: 'Colleges'
  },
  {
    id: 13,
    name: 'Example College 5',
    location: 'New York, NY',
    logo: 'myimages/uni1.png',
    category: 'Colleges'
  },
  {
    id: 14,
    name: 'Example College 6',
    location: 'New York, NY',
    logo: 'myimages/uni1.png',
    category: 'Colleges'
  },
  {
    id: 15,
    name: 'Example College 7',
    location: 'New York, NY',
    logo: 'myimages/uni1.png',
    category: 'Colleges'
  },
  {
    id: 16,
    name: 'Example College 8',
    location: 'New York, NY',
    logo: 'myimages/uni1.png',
    category: 'Colleges'
  },
  //Schools
  {
    id: 17,
    name: 'Example Schools 1',
    location: 'New York, NY',
    logo: 'myimages/uni1.png',
    category: 'Schools'
  },
  {
    id: 18,
    name: 'Example Schools 2',
    location: 'New York, NY',
    logo: 'myimages/uni1.png',
    category: 'Schools'
  },
  {
    id: 19,
    name: 'Example Schools 3',
    location: 'New York, NY',
    logo: 'myimages/uni1.png',
    category: 'Schools'
  },
  {
    id: 20,
    name: 'Example Schools 4',
    location: 'New York, NY',
    logo: 'myimages/uni1.png',
    category: 'Schools'
  },
  {
    id: 21,
    name: 'Example Schools 5',
    location: 'New York, NY',
    logo: 'myimages/uni1.png',
    category: 'Schools'
  },
  {
    id: 22,
    name: 'Example Schools 6',
    location: 'New York, NY',
    logo: 'myimages/uni1.png',
    category: 'Schools'
  },
  {
    id: 23,
    name: 'Example Schools 7',
    location: 'New York, NY',
    logo: 'myimages/uni1.png',
    category: 'Schools'
  },
  {
    id: 24,
    name: 'Example Schools 8',
    location: 'New York, NY',
    logo: 'myimages/uni1.png',
    category: 'Schools'
  },
  {
    id: 29,
    name: 'Example Schools 9',
    location: 'New York, NY',
    logo: 'myimages/uni1.png',
    category: 'Schools'
  },
  {
    id: 39,
    name: 'Example Schools 10',
    location: 'New York, NY',
    logo: 'myimages/uni1.png',
    category: 'Schools'
  },
  {
    id: 30,
    name: 'Example Schools 11',
    location: 'New York, NY',
    logo: 'myimages/uni1.png',
    category: 'Schools'
  },
  {
    id: 31,
    name: 'Example Schools 14',
    location: 'New York, NY',
    logo: 'myimages/uni1.png',
    category: 'Schools'
  },{
    id: 32,
    name: 'Example Schools 13',
    location: 'New York, NY',
    logo: 'myimages/uni1.png',
    category: 'Schools'
  },
  {
    id: 33,
    name: 'Example Schools 15',
    location: 'New York, NY',
    logo: 'myimages/uni1.png',
    category: 'Schools'
  },
];

const Features = () => {
  const totalInstitutesDisplay = 6;
  const [activeCategory, setActiveCategory] = useState('Universities');
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(totalInstitutesDisplay - 1);
  const [slideTransition, setSlideTransition] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  let filteredData = institutesData.filter(institute => institute.category === activeCategory);
  let visibleData = filteredData.slice(startIndex, endIndex + 1);

  useEffect(() => {
    const interval = setInterval(() => {
      if (endIndex === filteredData.length - 1) {
        const categories = ['Universities', 'Colleges', 'Schools'];
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
    }, 2000);
  
    return () => clearInterval(interval);
  }, [startIndex, endIndex, activeCategory]);
  
  

  const handleCategoryClick = (category) => {

    setActiveCategory(category);
    setStartIndex(0);
    setEndIndex(totalInstitutesDisplay - 1);
    filteredData = institutesData.filter(institute => institute.category === activeCategory);
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
        <button className={activeCategory === 'Universities' ? 'active' : ''} onClick={() => handleCategoryClick('Universities')}>Universities</button>
        <button className={activeCategory === 'Colleges' ? 'active' : ''} onClick={() => handleCategoryClick('Colleges')}>Colleges</button>
        <button className={activeCategory === 'Schools' ? 'active' : ''} onClick={() => handleCategoryClick('Schools')}>Schools</button>
      </div>
      <hr />
      <div className={`institute-list ${slideTransition ? 'slide' : ''}`}>
        {visibleData.map(institute => (
          <div key={institute.id} className="institute-box">
            <img src={institute.logo} alt={`${institute.name} logo`} />
            <div className="institute-details">
              <h3>{institute.name}</h3>
              <p>{institute.location}</p>
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
