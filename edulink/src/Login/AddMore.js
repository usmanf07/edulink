import React, { useState } from 'react';

function EducationInformationForm() {
  const [numForms, setNumForms] = useState(1);

  function handleAddMore() {
    if (numForms < 4) {
      setNumForms(numForms + 1);
    }
  }

  const educationForms = [];
  for (let i = 0; i < numForms; i++) {
    educationForms.push(
      <div key={i}>
        <input type="text" placeholder="Field 1" />
        <input type="text" placeholder="Field 2" />
        <input type="text" placeholder="Field 3" />
      </div>
    );
  }

  return (
    <div>
      {educationForms}
      {numForms < 4 && (
        <button onClick={handleAddMore}>
          Add More
        </button>
      )}
    </div>
  );
}

export default EducationInformationForm;
