import React, { useState } from 'react';

function Confirmation(props) {
  const [newName, setNewName] = useState('');

  const handleInputChange = (event) => {
    setNewName(event.target.value);
  };

  const handleConfirm = () => {

    props.onConfirm(props.program,"deadline");
  };

  const handleCancel = () => {
    props.onCancel("deadline");
  };

  return (
    <div className='frontdialogue'>
      <h1>
       Do you want to delete {props.program}
      </h1>

      <div className='cancelconfirm'>
        <button className='l_button' onClick={handleConfirm}>Confirm</button>
        <button className='r_button' onClick={handleCancel}>Cancel</button>
      </div>
    </div>
  );

}

export default Confirmation;
