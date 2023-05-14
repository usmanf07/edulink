import React, { useRef } from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import "./bodyA.css";
import Review from './Review';
import PictureUpload from './PictureUpload';


// import { useParams } from 'react-router-dom';


class BodyA extends React.Component{


    constructor(props){
        super(props);
        this.state =
        {
            back:"temp",
            image:null,
            showForm: 0,
            ProgramsList :
            [ ]
            ,

            AdmissionsOpen :
            [ ],

            imageNames : [],
            // img :pi,
            currentImageIndex: 0,
            name: props.name,
            update:props.update,

        }

    }



    componentDidUpdate(prevProps) {
        if (prevProps.update !== this.props.update) {

          this.fetchProgramsList();
          this.fetchProgramsList();
        }
        if(prevProps.name !== this.props.name)
        {
            this.setState({name:this.props.name});


        }



    }



    componentDidMount() {
        // alert(name);




        this.intervalId = setInterval(this.nextImage, 2000);

        this.fetchProgramsList();
        this.fetchAdmissionsOpen();


    }

    async fetchProgramsList() {

        try {

          const response = await axios.get(`http://localhost:8000/SingleInstitutePage/${this.state.name}`);
          this.setState({ ProgramsList: response.data.programs, imageNames: response.data.images });
        } catch (error) {
          console.error('Failed to retrieve programs:', error);
        }
      }



    fetchAdmissionsOpen() {
        axios.get(`http://localhost:8000/university/admissions/${this.state.name}`)
            .then((response) => {
                this.setState({ AdmissionsOpen: response.data });
                // alert(response.data[0].programName);
            })
            .catch((error) => {
                console.error("Failed to get admissions", error);
            });
    }
      componentWillUnmount() {
        clearInterval(this.intervalId);
      }

    nextImage = () => {
        const { imageNames, currentImageIndex } = this.state;

        const nextIndex = (currentImageIndex + 1) % imageNames.length;
        this.setState({ currentImageIndex: nextIndex });
      }
      addDomain =(temp) =>
      {

        // alert(temp);
       this.props.onAddDomain(temp);
      }

      toggleForm = () => {
        this.setState(prevState => ({ showForm: !prevState.showForm }));

      }
      refresh = async () => {
        try {
          await this.fetchProgramsList();

        } catch (error) {
          console.error('Failed to refresh programs list:', error);
        }
        this.setState({showForm:0});
      }


    render(){

        const { imageNames, currentImageIndex } = this.state;
        const imageUrl = imageNames[currentImageIndex];

        return(


            <div className='bodyA'>

            {/* {this.state.update===1 && this.setState({ProgramsList:[]})} */}

                <p className='programsOfferedHeading'>Programs Offered</p>
                {this.state.ProgramsList.map( (programlist)=>

                    <div className="ProgramsOfferedList">


                        <div className='buttonforprogram'>
                        <p className="ProgramName"> {programlist.name}</p>

                        <button className='programButon' onClick={() => this.addDomain(programlist.name)}>Add a domain</button>


                        </div>


                        <div className="ProgramDomain">


                            <table>
                            {programlist.domains[0]!=null && programlist.domains[0].map((domain,index,next) =>
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
                    <button className="ApplyBtn">Close Deadline</button>
                    </div>
                    </div>
                )}

                {/* </div> */}
                <button className='addanewimage'  onClick={this.toggleForm}>
                    Add a New Image
                </button>

                {this.state.showForm===true && <PictureUpload institute={this.state.name} onRefresh={this.refresh}/>}

                {/* {this.state.imageNames.map( (image)=> */}
                  <div >
                    <img  className='UniversityImages' alt="" src={"http://localhost:8000/images/"+imageUrl}/>
                  </div>

                    {/* )} */}


                {/* <Review  name={this.state.name}/> */}

            </div>
        )
    }
}

export default BodyA;

