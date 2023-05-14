import React, { useState } from 'react';

function Addaprogram(props) {
  const [newName, setNewName] = useState('');

  const handleInputChange = (event) => {
    setNewName(event.target.value);
  };

  const handleConfirm = () => {
    if(!newName)
    {
      alert("Enter New Program");
      return;
    }
    props.onConfirm(newName,"prog");
  };

  const handleCancel = () => {
    props.onCancel("prog");
  };

  return (
    <div className='frontdialogue'>
      <h1>
        Enter New Program Name
      </h1>
      <label htmlFor="new-description">New Program:</label>
      <br></br>

      <input
        type="text"
        id="new-name"
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

export default Addaprogram;
