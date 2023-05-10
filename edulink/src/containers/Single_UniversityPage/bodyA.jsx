import React, { useRef } from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import "./bodyA.css";
import Review from './Review';
import SimpleSlider from '../header/SimpleSlider';

// import { useParams } from 'react-router-dom';


class BodyA extends React.Component{


    constructor(props){
        super(props);
        this.state = 
        {
            ProgramsList : 
            [ ]
            ,

            AdmissionsOpen : 
            [ ],

            imageNames : [],
            // img :pi,
            currentImageIndex: 0,
            name: props.name,

        }
    }



    componentDidMount() {
       
        // alert(name);
        this.intervalId = setInterval(this.nextImage, 2000);

        axios.get(`http://localhost:8000/SingleInstitutePage/${this.state.name}`)
            .then((response) => {

                this.setState({ ProgramsList: response.data.programs, AdmissionsOpen:response.data.admissionsOpen ,imageNames:response.data.images}
                    );
                    // console.log("imageehbhebgevg    " + this.state.imageNames);
            })
            .catch((error) => console.error('Failed to retrieve universities:', error));
      }
      
      componentWillUnmount() {
        clearInterval(this.intervalId);
      }

    nextImage = () => {
        const { imageNames, currentImageIndex } = this.state;
        const nextIndex = (currentImageIndex + 1) % imageNames.length;
        this.setState({ currentImageIndex: nextIndex });
      }

    render(){
        
        const { imageNames, currentImageIndex } = this.state;
        const imageUrl = imageNames[currentImageIndex];

        return(
            <div className='bodyA'>

                

                <p className='programsOfferedHeading'>Programs Offered</p>
                {this.state.ProgramsList.map( (programlist)=>

                    <div className="ProgramsOfferedList">

                        <p className="ProgramName"> {programlist.name}</p>
                        <div className="ProgramDomain">
                            <table>
                            {programlist.domains[0].map((domain,index,next) => 
                                index%3 === 0 && 
                                (
                                    <tr className='tr' key={index}>
                                    {
                                        index < next.length &&
                                        <td> {next[index]} </td>
                                    }

                                    {
                                        (index+1) < next.length && 
                                        <td className='td2'> {(next[index +1])} </td>
                                    }

                                    {
                                        (index+2) < next.length && 
                                        <td className='td3'> {(next[index +2])} </td>
                                    }  
                                    </tr>
                                )

                            )}
                            </table>
                        </div>

                    </div>
                )}
                

                {/* <div className='AdmissionNews'> */}
                {this.state.AdmissionsOpen.map( (admission)=>

                    <div className="AdmissionNews">
                    <div className='center'>

                    <h1>Admissions Open For {admission.name}</h1>
                    <p>Deadline : {admission.deadline}</p>
                    <button className="ApplyBtn">Apply Now</button>
                    </div>
                    </div>
                )}
                
                {/* </div> */}
              
                {/* {this.state.imageNames.map( (image)=> */}
                  <div >
                    <img  className='UniversityImages' alt="" src={"http://localhost:8000/images/"+imageUrl}/>
                  </div>
                   
                    {/* )} */}
              

                <Review  name={this.state.name}/>
                
            </div>
        )
    }
}

export default BodyA;

