import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./University_Description.css";

function University_Description(props){

    const [desc, setdesc] = useState();
    const [name,setName] = useState(props.name);

    useEffect(() => {
      axios.get(`http://localhost:8000/SingleInstitutePage/${name}`)
        .then((response) => {
          // console.log(response.data[0].description);
          setdesc(response.data.description);
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