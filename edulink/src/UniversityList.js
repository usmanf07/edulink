import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function UniversityList() {
  const [universities, setUniversities] = useState([]);
  const navigate= useNavigate();
  useEffect(() => {
    axios.get('http://localhost:8000/university')
      .then((response) => {
        console.log('Universities:', response.data);
        setUniversities(response.data);
      })
      .catch((error) => console.error('Failed to retrieve universities:', error));
  }, []);

  return (
    <div>
      <h1>University List</h1>
      <ul>
        {universities.map((university) => (
          <li key={university._id}>
            <h2>{university.name}</h2>
            <p>{university.address}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UniversityList;
