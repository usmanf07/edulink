import React from 'react';
import "./University_Description.css";

class University_Description extends React.Component {

    constructor(){
        super();
        this.state =
        {
            desc: "The National University of Computer and Emerging Sciences ,also commonly known as \"Foundation for Advancement of Science and Technology\" (FAST),is a private research university with multiple campuses in different cities of Pakistan" +
           " The university offers undergraduate and graduate degrees, including doctoral and professional degrees. Founded in 1991, it was initially formed for the need of commissioned officers by combining engineering colleges and schools. Later, it was converted into a public research university with the main campus setup in Islamabad to promote science and technology in Pakistan",
        }
    }
    render(){
        return (
            <div className='description_Paragraph'> 
                <p> {this.state.desc}</p>
            </div>
        )
    }
}
export default University_Description;