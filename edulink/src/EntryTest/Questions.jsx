import React, { useState, useEffect } from 'react';
import './questions.css';
const Questions = ({ questions, onTestEnd}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [userAnswer, setUserAnswer] = useState('');
  const [message, setMessage] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10 * 60); // 10 minutes in seconds
  
  // Update the time left every second
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTimeLeft) => {
        if (prevTimeLeft === 0) {
          clearInterval(timer);
          handleEndTest();
          return 0;
        } else {
          return prevTimeLeft - 1;
        }
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleEndTest = () => {
    setMessage('Time is up!');
    setShowAnswer(false);
    
  };

  const handleAnswerCheck = () => {
    const correctAnswer = questions[currentQuestionIndex].correct_answer;
    if (userAnswer === correctAnswer) {
        setIsCorrect(true);
      setMessage('Correct answer!');
      setScore(score + 10);
    } else {
        setIsCorrect(false);
      setMessage('Incorrect answer! Answer was: ' + correctAnswer);
    }
    setTimeout(() => {
        handleNextQuestion();
      }, 3000);
  };

  const handleNextQuestion = () => {
    
    setMessage('');
    setShowAnswer(false);
    setUserAnswer('');
    
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    if (currentQuestionIndex === questions.length - 1) {
        setTimeout(() => {
            onTestEnd();
            return;
          }, 5000);
       
    }
  };

  const handleRevealAnswer = () => {
    //setShowAnswer(true);
    setMessage('Answer was: ' + questions[currentQuestionIndex].correct_answer);
    setTimeout(() => {
      handleNextQuestion();
    }, 3000);
  };

  
  return (
    <div>
        {questions[currentQuestionIndex] && (
    <div className='questions-headers'>
         <p>Score: {score}</p>
         <p>Time Left: {timeLeft} seconds</p>
    </div>)}
    {questions[currentQuestionIndex] && (
    <div className='questions-label'>
        
      <h2>{currentQuestionIndex + 1}. {questions[currentQuestionIndex].question}  </h2>
      <ul style={{ listStyleType: 'none' }}>
  {questions[currentQuestionIndex].options.map((option, index) => (
    <li key={index}>
      <label >
      <span>{String.fromCharCode(65 + index)}. </span>
        <input
          type='radio'
          value={String.fromCharCode(65 + index)}
          checked={userAnswer === String.fromCharCode(65 + index)}
          onChange={(e) => setUserAnswer(e.target.value)}
        />
       
        {option}
      </label>
    </li>
  ))}
</ul>


      {showAnswer && (
        <div>
          Correct answer: {questions[currentQuestionIndex].correct_answer}
        </div>
      )}
      <button onClick={handleAnswerCheck}>Check answer</button>
      <button onClick={handleRevealAnswer}>Reveal answer</button>
      <button disabled={currentQuestionIndex === questions.length - 1} onClick={handleNextQuestion}>Next question</button>
        <div className={isCorrect ? 'question-correct' : 'question-incorrect'}>
            {message}
        </div>

    </div>)}
    {!questions[currentQuestionIndex] && (
        <div className='questions-label'>
            <h2>Test Ended!</h2>
            <p>Your score is: {score}</p>
        </div>
    )}
    </div>
  );
};

export default Questions;
