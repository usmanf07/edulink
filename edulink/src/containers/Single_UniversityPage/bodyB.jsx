import React, { useRef } from 'react';
import "./bodyB.css";
// import Map from '../../assets/GoogleMaps.png';
import axios from 'axios';
// import ButtonBar from './buttons_bar'

class BodyB extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            Location: "",
            Email:[],
            Inquiry:
            [],
            RelatedInstitutes:
            [],
            GoogleMap:"",
            name: props.name,
            uniID: "",
            scope: "",
            type:"",

        }
    }

    componentDidMount() {

        axios.get(`http://localhost:8000/SingleInstitutePage/${this.state.name}`)
        .then((response) => {

            this.setState({ Location: response.data.location[0], Email:response.data.emails ,Inquiry:response.data.inquiries,RelatedInstitutes:response.data.relatedInstitutes
                ,GoogleMap: response.data.googlemap}
                );
                // console.log("imageehbhebgevg    " + this.state.imageNames);
        })
        .catch((error) => console.error('Failed to retrieve universities:', error));

        
        axios.get(`http://localhost:8000/SingleInstitutePage/getuniID/${this.state.name}`)
        .then((response) => {

            console.log("nhgcd" + response.data);
            axios.get(`http://localhost:8000/SingleInstitutePage/getType/getscope/${response.data}`)
            .then((res) => {
    
                console.log("juhgy" + res.data);
                this.setState({scope: res.data.scope ,type: res.data.type});
                
            })
            .catch((error) => console.error('Failed to retrieve universities:', error))

            this.setState({ uniID: response.data},

               

            );
        })
        .catch((error) => console.error('Failed to retrieve universities:', error));


      }

    render(){
        return(
            <div className='bodyB'>
            {/* <ButtonBar /> */}

            <div className='AdmissionOffice'>
                <h>Admission Office</h>
                <iframe className="gmap_iframe" src={`https://maps.google.com/maps?q=${this.state.GoogleMap}&output=embed`} ></iframe>
                {/* <img src={Map}></img> */}
            </div>

            <div className='Location'>
                <h>Location</h>

                <p>{this.state.Location}</p>
            </div>

            <div className='Email'>
                <h>Email</h>
                <ul>
                {this.state.Email.map( (email)=>

                <li>{email}</li>
                )}
                </ul>
            </div>

            <div className='Inquiries'>
                <h>Scope</h>
                <p>{this.state.scope}</p>

            </div>

            <div className='Inquiries'>
                <h>Type</h>
                <p>{this.state.type}</p>

            </div>

            {/* <div className='RelatedInstitutes'>
                <h>RelatedInstitutes</h>
                <ul>
                {this.state.RelatedInstitutes.map( (rel_Ins)=>

                <li>{rel_Ins}</li>
                )}
                </ul>
            </div> */}

            </div>
        )
    }
}

export default BodyB;
