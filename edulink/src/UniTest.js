import React,{useState} from 'react'
import axios from 'axios';

export default function UniTest() {
  const [uniId, setUniId] = useState('');
  const [noofquestion, setNoOfQuestion] = useState(0);
  const [currentQuestion,setCurrentQuestion]=useState(0);
  const [questions, setQuestions] = useState([]);
  const [statement, setStatement] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState('');

  const handleBack = () => {
    if (currentQuestion > 0) {
      const prevQuestion = questions[currentQuestion - 1];
      setStatement(prevQuestion.statement);
      setOptions(prevQuestion.options.map((option) => option.statement));
      setCurrentQuestion(currentQuestion - 1);
    }
  };


  const handleUniIdChange = (event) => {
    setUniId(event.target.value);
  };

  const handleStatementChange = (event) => {
    setStatement(event.target.value);
  };

  const handleOptionChange = (index, event) => {
    const newOptions = [...options];
    newOptions[index] = event.target.value;
    setOptions(newOptions);
  };

  const handleAddQuestion = () => {
    if (statement.trim() === '' || options.some((option) => option.trim() === '')) {
     alert("please fill all the fields")
      return;
    }
    const newQuestion = {
      statement,
      options: options.map((option) => ({ statement: option })),
    };

    const updatedQuestions = [...questions];
    updatedQuestions.splice(currentQuestion, 0, newQuestion);

    setQuestions(updatedQuestions);
    setStatement('');
    setOptions(['', '', '', '']);
    setCurrentQuestion(currentQuestion + 1);
  };


  const handleSubmit = async () => {
    try {
      const unnid = sessionStorage.getItem('uniid');
      console.log('Session ID:', unnid);
      const response = await axios.post('http://localhost:8000/SingleInstitutePage/addtest/addnewtest', {
        uniid: unnid,
        questions: questions,
      });
      if (response.status === 200) {
        setSubmitSuccess('Success');
        setSubmitError('');
      } else {
        setSubmitSuccess('');
        setSubmitError('Error');
      }
    } catch (error) {
      console.error('Failed to add questions:', error);
      setSubmitSuccess('');
      setSubmitError('Error');
    }
  };

  const handlequestionchange =(event)=>
  {
    setNoOfQuestion(event.target.value);

  }
  return (


    <div className='universitytest'>
    <div className='unitest'>

      <h2>Make Test for University</h2>

      <div>
        <label className='setpara' htmlFor="number">Number Of Question:</label>
        <input type="text" id="noofquestion" value={noofquestion} onChange={handlequestionchange} />
      </div>

      {noofquestion!=0 && <div>
        {currentQuestion!=noofquestion && <>
      <div>
        <label  className='setpara' htmlFor="statement">Question Statement:</label>
        <input type="text" id="statement" value={statement} onChange={handleStatementChange} />
      </div>
      <div>
        <p  className='setpara'>Options:</p>
        {options.map((option, index) => (
          <input
          placeholder={"option "+index }
            key={index}
            type="text"
            value={option}
            onChange={(event) => handleOptionChange(index, event)}
          />
        ))}
      </div>




       </>
        }
        <div className='setbutn'>

         {currentQuestion!=noofquestion &&
      <div>
        <button onClick={handleAddQuestion}>Add Question</button>
      </div>
      }

    <div>
        <button onClick={handleBack}>Back</button>
     </div>
     </div>
  </div>
}

    {currentQuestion==noofquestion && currentQuestion!=0 &&
      <div>
        <button className='mysubmit' onClick={handleSubmit}>Submit</button>
      </div>
    }
    {submitSuccess && <p style={{ color: 'green' }}>Success</p>}
      {submitError && <p style={{ color: 'red' }}>{submitError}</p>}
    </div>


    </div>
  );
};


