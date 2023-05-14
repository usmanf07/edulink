import React, { useState } from 'react';

function AddADomain(props) {
  const [newName, setNewName] = useState('');

  const handleInputChange = (event) => {
    setNewName(event.target.value);
  };

  const handleConfirm = () => {
    if(!newName)
    {
      alert("Enter New domain");
      return;
    }
    props.onConfirm(newName,"domain");
  };

  const handleCancel = () => {
    props.onCancel("domain");
  };

  return (
    <div className='frontdialogue'>
      <h1>
        Enter a new Domain to add
      </h1>
      <label htmlFor="new-description">New Description:</label>
      <br></br>

      <input
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

export default AddADomain;
