import React from 'react';
import './editProfile.css';
const ProgressBar = ({ progress, color1, color2 }) => {
  const progressBarStyles = {
    height: '20px',
    borderRadius: '10px',
    background: color2,
    position: 'relative',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  };

  const fillerStyles = {
    height: '100%',
    width: `${progress}%`,
    borderRadius: 'inherit',
    transition: 'width .2s ease-in',
    background: color1,
    position: 'absolute',
    left: 0,
    top: 0
  };

  const progressBarValueStyles = {
    margin: '0.5rem',
    color: color1,
  }
  return (
    <div>
    <div style={progressBarStyles}>
      <div style={fillerStyles}></div>
      
    </div>
    <h1 style={progressBarValueStyles}>{progress}%</h1>
    </div>
    
  );
};

export default ProgressBar;
