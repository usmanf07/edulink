import React, { useState } from 'react';

function DescriptionChange(props) {
  const [newName, setNewName] = useState('');

  const handleInputChange = (event) => {
    setNewName(event.target.value);
  };

  const handleConfirm = () => {
    if(!newName)
    {
      alert("Enter New Description");
      return;
    }
    props.onConfirm(newName,"Descc");
  };

  const handleCancel = () => {
    props.onCancel("Descc");
  };

  return (
    <div className='frontdialogue'>
      <h1>
        Enter New Description
      </h1>
      <label htmlFor="new-description">New Description:</label>
      <br></br>

      <textarea
        id="new-description"
        rows="4"
        cols="50"
        value={newName}
        onChange={handleInputChange}
      />
      <div className='cancelconfirm'>
        <button className='l_button' onClick={handleConfirm}>Confirm</button>
        <button className='r_button' onClick={handleCancel}>Cancel</button>
      </div>
    </div>
  );

}

export default DescriptionChange;
