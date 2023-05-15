import React, { useState } from 'react';

function AddApply(props) {
  const [programName, setProgramName] = useState('');
  const [deadline, setDeadline] = useState('');

  const handleProgramNameChange = (event) => {
    setProgramName(event.target.value);
  };

  const handleDeadlineChange = (event) => {
    setDeadline(event.target.value);
  };

  const handleConfirm = () => {
    if (!programName) {
      alert('Please enter a program name');
      return;
    }

    const now = new Date();
    const selectedDate = new Date(deadline);
    if (selectedDate <= now) {
      alert('Please select a date in the future');
      return;
    }

    props.onConfirm(programName, deadline,"Apply");
  };

  const handleCancel = () => {
    props.onCancel("Apply");
  };

  return (
    <div className='frontdialogue'>
      <h1>Enter New Program Name</h1>
      <label htmlFor='program-name'>Program Name:</label>
      <br />
      <input type='text' id='program-name' value={programName} onChange={handleProgramNameChange} />
      <br />
      <label htmlFor='deadline'>Application Deadline:</label>
      <br />
      <input type='date' id='deadline' value={deadline} onChange={handleDeadlineChange} />
      <div className='cancelconfirm'>
        <button className='l_button' onClick={handleConfirm}>
          Confirm
        </button>
        <button className='r_button' onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
}

export default AddApply;
