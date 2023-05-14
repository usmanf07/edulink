import React, { useState } from 'react';

function NameChange(props) {
  const [newName, setNewName] = useState('');

  const handleInputChange = (event) => {
    setNewName(event.target.value);
  };

  const handleConfirm = () => {
    if(!newName)
    {
      alert("Enter New Name");
      return;
    }
    props.onConfirm(newName,"Name");
  };

  const handleCancel = () => {
    props.onCancel("Name");
  };

  return (
    <div className='frontdialogue'>
      <h1>
        Enter New Name
      </h1>
      <label htmlFor="new-name">New Name:</label>
      <input
        type="text"
        id="new-name"
        value={newName}
        onChange={handleInputChange}
      />
      <div className='cancelconfirm'>
      <button className='l_button' onClick={handleConfirm}>Confirm</button>
      <button  className='r_button' onClick={handleCancel}>Cancel</button>
      </div>
    </div>
  );
}

export default NameChange;
