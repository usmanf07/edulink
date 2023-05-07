import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./University_Description.css";

function University_Description(){

    const [desc, setdesc] = useState();

    useEffect(() => {
      axios.get('http://localhost:8000/SingleInstitutePage')
        .then((response) => {
          // console.log(response.data[0].description);
          setdesc(response.data[0].description);
        })
        .catch((error) => console.error('Failed to retrieve universities:', error));

  
    }, []);

        return (
            <div className='description_Paragraph'> 
                <p> {desc}</p>
            </div>
        )
    
}
export default University_Description;