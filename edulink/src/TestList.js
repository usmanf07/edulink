import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const TestList = () => {
  const [tests, setTests] = useState([]);


  const navigate=useNavigate();
  useEffect(() => {
    const uniid = sessionStorage.getItem("uniid"); // Replace with the actual university ID

    const fetchTests = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/singleinstitutepage/tests/total/${uniid}`);
        const totalTests = response.data.totalTests;
        const testNames = Array.from({ length: totalTests }, (_, index) => `Test ${index + 1}`);
        setTests(testNames);
      } catch (error) {
        console.error('Failed to fetch tests:', error);
      }
    };

    fetchTests();
  }, []);

  const moveTopage = (index) =>
  {
    const uniid = sessionStorage.getItem("uniid");
    navigate(`/universitydash/${uniid}/showtest/${index}`);

  }


  return (
    <div className='showtest'>
      <div className='showtest1'>
      <h2>Test List</h2>
      <h2>Total Number of tests {tests.length}</h2>
      <ul className='listdec'>
        {tests.map((test, index) => (
         <div className='testlis' onClick={() => moveTopage(index)}> <li className='setmargin' key={index}>{test}</li></div>
        ))}
      </ul>
    </div>
    </div>
  );
};

export default TestList;
