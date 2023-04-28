import React, { useRef } from 'react';
import "./bodyA.css";
import Review from './Review';
import SimpleSlider from '../header/SimpleSlider';
import dummy1 from '../../assets/th (1).jpeg'
import dummy2 from '../../assets/th (2).jpeg'
import dummy3 from '../../assets/th (3).jpeg'
import dummy4 from '../../assets/th (4).jpeg'
import dummy5 from '../../assets/th (5).jpeg'

class BodyA extends React.Component{
    constructor(){
        super();
        this.state = 
        {
            ProgramsList : 
            [
                {programName: "Bachelor Of Science", 
                Domains: ['Computer Science', 'Software Engineering','Electrical Engineering', 'Civil Engineering',
                        'Robotics', 'Accounting & Finance', 'Artifical Intelligence', 'Machine Learning'] },

                {programName: "Master Of Science", 
                Domains: ['Computer Science', 'Software Engineering','Electrical Engineering', 'Civil Engineering',
                        'Robotics', 'Accounting & Finance', 'Artifical Intelligence'] },

                {programName: "PHD", 
                Domains: ['Business Administration', 'Business Analytics','Computer Science', 'Data Science',
                        'Mathematics'] },
            ],

            AdmissionsOpen : 
            [
                {programName: "Bachelor Of Science", 
                 deadline: '27th May, 2023' },

                 {programName: "Bachelor Of Master", 
                 deadline: '30th May, 2023' },

               
            ],

            imageNames : [dummy1,dummy2,dummy3,dummy4,dummy5],
            img :dummy1,
            currentImageIndex: 0

        }
    }

    componentDidMount() {
        this.intervalId = setInterval(this.nextImage, 2000);
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

                        <p className="ProgramName"> {programlist.programName}</p>
                        <div className="ProgramDomain">
                            <table>
                            {programlist.Domains.map((domain,index,next) => 
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

                    <h1>Admissions Open For {admission.programName}</h1>
                    <p>Deadline : {admission.deadline}</p>
                    <button className="ApplyBtn">Apply Now</button>
                    </div>
                    </div>
                )}
                
                {/* </div> */}
              
                {/* {this.state.imageNames.map( (image)=> */}
                  <div >
                    <img  className='UniversityImages' alt="" src={imageUrl}/>
                  </div>
                   
                    {/* )} */}
              

                <Review />
                
            </div>
        )
    }
}

export default BodyA;

