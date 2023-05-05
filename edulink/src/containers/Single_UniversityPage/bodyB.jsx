import React  from 'react';
import "./bodyB.css";
import Map from '../../assets/GoogleMaps.png';
// import ButtonBar from './buttons_bar'

class BodyB extends React.Component{
    constructor(){
        super();
        this.state = {
            Location: "852-B Milaad St, Block B Faisal Town, Lahore, Punjab 54770, Pakistan",
            Email:["admissions@lhr.nu.edu.pk","saif.ullah@nu.edu.pk"],
            Inquiry:
            [
                {Helpline:'(042) 111 128 128'},
                {Official_Website: 'https://lhr.nu.edu.pk/'},
                {Facebook: ''},
            ],
            RelatedInstitutes:
            [
                "Comats","Ghulam Ishaq Khan Institute (Giki)","Lahore University of Managemnt Sciences (LUMS)", "Pieas","National University of Science and Technologies (NUST) Islamabad",
            ]
        }
    }

    render(){
        return(
            <div className='bodyB'>
            {/* <ButtonBar /> */}

            <div className='AdmissionOffice'>
                <h>Admission Office</h>
                <img src={Map}></img>
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
                <h>Inquiries</h>
                <ul>
                {this.state.Inquiry.map( (inq)=>
                
                (inq.Helpline &&
                <li>Helpline : {inq.Helpline}</li>)

                ||

                (inq.Official_Website &&
                <li>Official Website : {inq.Official_Website}</li>)

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