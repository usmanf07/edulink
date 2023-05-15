import React, { useRef } from 'react';
import "./bodyB.css";

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
            newlocation:"",
            isEditing:"",
            editingEmail: "",
            emailchange:""
        }
    }


    handleLocationChange = (event) => {
        this.setState({ Location: event.target.value });

      }

      handleSubmit = async (event) => {
        event.preventDefault();

        try {
          const response = await axios.put(`http://localhost:8000/SingleInstitutePage/${this.state.name}/location`, { location: this.state.Location });

          console.log(response);
        this.setState({isEditing:0});
          this.setState({ Location: response.data.location[0] });
        } catch (error) {
          console.error('Failed to update location:', error);
        }
      }

      handleEdit = () => {
        this.setState({ isEditing: true });
      }

      handleCancel = () => {
        this.setState({ isEditing: false });
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
      }



    handleEdit = (email) => {
        this.setState({ emailchange: email });
    }


    handleEmailCancel = () => {
        this.setState({ editingEmail: -1 });
      }

    handleEmailChange = (event) => {
        this.setState({ emailchange: event.target.value });


    }

    handleEmailConfirm = async (temp) => {
        try {

            const response = await axios.put(`http://localhost:8000/SingleInstitutePage/institutes/${this.state.name}/email-confirm`, { index:temp, newEmail: this.state.emailchange });

            this.setState({Email:response.data.emails});
            // const updatedEmails = this.state.Email.map(e => e === email ? this.state.editingEmail : e);

            this.setState({  editingEmail: "" });
        } catch (error) {
            console.error('Failed to update email:', error);
        }
    }

    handleEmailEdit = (index) => {
        this.setState({ editingEmail: index });
      }

    render(){
        const isEditing = this.state.isEditing;
        const Location = this.state.Location;
        const editingEmail = this.state.editingEmail;
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




                {isEditing===true &&
          <div className='editSymbolwhite'>
            <input className='editinput' type='text' value={this.state.Location} onChange={this.handleLocationChange} />

            <div className='editButtons'>
              <button onClick={this.handleSubmit} className='editbut'>Update</button>
              <button onClick={this.handleCancel} className='editbut'>Cancel</button>
            </div>
            </div>
            }


        <div className='editSymbolwhite' >
            <p>{this.state.Location}</p>

            <div className='editPicture' onClick={this.handleEdit}>
              <img src="/edit-16.png" alt="My Image" />
            </div>
          </div>





            </div>

            <div className='Email'>
                <h>Email</h>
                <ul>
                    {this.state.Email.map((email, index) => (
                        <li key={index}>
                            {editingEmail === index ?
                                <div className='myemailflex'>
                                    <input className='editinput' type='text' value={this.emailchange} onChange={(event) => this.handleEmailChange(event, index)} />
                                    <div className='editButtons'>
                                        <button onClick={() => this.handleEmailConfirm(index)} className='editbut'>Confirm</button>
                                        <button onClick={this.handleEmailCancel} className='editbut'>Cancel</button>
                                    </div>
                                </div>
                                :
                                <div className='myemailflex'>
                                    <p>{email}</p>
                                    <div className='editPicture' onClick={() => this.handleEmailEdit(index)}>
                                        <img src="/edit-16.png" alt="My Image" />
                                    </div>
                                </div>
                            }
                        </li>
                    ))}
                </ul>
            </div>

            <div className='Inquiries'>
                <h>Inquiries</h>
                <ul>
                {this.state.Inquiry.map( (inq)=>

                (inq.helpline &&
                <li>Helpline : {inq.helpline}</li>)

                ||

                (inq.officialWebsite &&
                <li>Official Website : {inq.officialWebsite}</li>)

                ||

                (inq.Facebook &&
                <li>Facebook : {inq.Facebook}</li>  )



                )}

                </ul>
            </div>

            <div className='RelatedInstitutes'>
                <h>RelatedInstitutes</h>
                <ul>
                {this.state.RelatedInstitutes.map( (rel_Ins)=>

                <li>{rel_Ins}</li>
                )}
                </ul>
            </div>

            </div>
        )
    }
}

export default BodyB;
