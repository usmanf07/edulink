import React, { useState, useEffect } from 'react';
import { Navbar } from '../components'
import './entryTest.css'
import axios from 'axios';
import Questions from './Questions';
const EntryTest = () => {
    const [selectedSubject, setSelectedSubject] = useState('');
    const [loading, setLoading] = useState(false);
    const [questions, setQuestions] = useState(null);
  
    const handleSubjectChange = (e) => {
        setSelectedSubject(e.target.value.toLowerCase());
      };

    const handleStartPractice = async () => {
      setLoading(true);
  
      try {
        const response = await axios.get(`http://localhost:8000/entrytest/${selectedSubject}`);
        setQuestions(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
  
    };

  const handleTestEnd = () => {
    setQuestions(null);
  };

    return (
        <div>
          {/* <Navbar /> */}
          <div className='entryTest'>
            
                <h1>Sample Entry Test Prep</h1>
                {!questions ? (
              <>
                <div className='entryTest__container'>
                  <h2>Prepare for entry test using our question bank</h2>
                  <p>
                    Our question bank contains thousands of MCQs from all subjects of
                    entry tests. You can practice these MCQs and prepare for your entry
                    test.
                  </p>
                  <div className='entryTest__container__fields'>
                    <select value={selectedSubject} onChange={handleSubjectChange}>
                      <option value=''>Select a subject</option>
                      <option value='physics'>Physics</option>
                      <option value='chemistry'>Chemistry</option>
                      <option value='mathematics'>Mathematics</option>
                      <option value='biology'>Biology</option>
                    </select>
                  
                    <button disabled={!selectedSubject} onClick={handleStartPractice}>
                      {loading ? 'Preparing...' : 'Start Practicing Now!'}
                    </button>
                  </div>
                </div>
              </>
            ) : (
                
                <div className='entryTest__container'>
                   
                    <Questions questions={questions} onTestEnd={handleTestEnd} />
                </div>
            )}
          </div>
        </div>
      );
            };      
export default EntryTest;
