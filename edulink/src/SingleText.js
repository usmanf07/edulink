import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';


const SingleText = () => {
  const params = useParams();
  const { index } = useParams();
  const [uniId, setUniId] = useState('');
  const [questions, setQuestions] = useState([]);
  const [pdfviewer,setpdf] =useState(0);

  useEffect(() => {

    const uniIdFromStorage = sessionStorage.getItem('uniid');
    setUniId(uniIdFromStorage);
  }, []);


  const handleDownloadPDF = async () => {
    try {
      const response = await axios.post('http://localhost:8000/generate-pdf', {
        questions,
      });
      const downloadUrl = response.data.downloadUrl;
      window.open(downloadUrl, '_blank');
    } catch (error) {
      console.error('Failed to generate PDF:', error);
    }
  };
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.post('http://localhost:8000/SingleInstitutePage/gettext', {
          uniid:uniId,
          index:params.id,
        });
        setQuestions(response.data.questions);
      } catch (error) {
        console.error('Failed to fetch questions:', error);
      }
    };

    fetchQuestions();
  }, [uniId, index]);



  const openpdf =() =>
  {

    setpdf(1);

  }
  return (
    <div className='mainques'>

      <div className='allques'>
      <h1>Text no: {params.id}</h1>
      {questions.map((question, i) => (
        <div key={i}>
          <h2 className='setmargin'>Question no {i+1}</h2>

          <h3 className='setmargin'>Statement: {question.statement}</h3>
          <ul className='listset'>
            {question.options.map((option, j) => (
              <li className='myli' key={j}>{option.statement}</li>
            ))}
          </ul>
        </div>
      ))}

      <button className='pdfbutton' onClick={handleDownloadPDF}>Download PDF Of Question</button>
      </div>




    </div>
  );
};

export default SingleText;
