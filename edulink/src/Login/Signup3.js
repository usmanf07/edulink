import React,{useState} from 'react'

export default function Signup3({onNext}) {

  const [language, setLanguage] = useState('');
  const [proficiency, setProficiency] = useState('');
  const handleNext = (e) => {
    e.preventDefault();
    onNext({ language, proficiency});

  };

  return (
    <div className='sign'>
      <div>
    <h1>
      Sign Up
    </h1>
    </div>

    <div className='information'>

    <label htmlFor="language">Select a language:</label>

    <select id="language" name="language" value={language} onChange={(e) => setLanguage(e.target.value)}>
            <option value="">Select language</option>
            <option value="english">English</option>
            <option value="urdu">Urdu</option>
    </select>


    <label htmlFor="proficiency">Select proficiency level:</label>
          <select id="proficiency" name="proficiency" value={proficiency} onChange={(e) => setProficiency(e.target.value)}>
            <option value="">Select proficiency level</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>

          <button className='next' onClick={handleNext}>Next</button>
      </div>
      </div>

  )
}

