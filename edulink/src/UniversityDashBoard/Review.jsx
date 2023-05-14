import React, { useRef } from 'react';
import axios from 'axios';
import "./Review.css";
// import SimpleSlider from '../header/SimpleSlider';

class Review extends React.Component{
    constructor(props){
        super(props);
        this.state = 
        {
          review : "",
          reviewer: "",
          name: props.name,
        }
    }

    componentDidMount() {
       

        axios.get(`http://localhost:8000/SingleInstitutePage/${this.state.name}`)
            .then((response) => {

                // console.log(response.data.reviews);
                this.setState({ review: response.data.reviews[0].review, reviewer:response.data.reviews[0].reviewerName}
                    // {AdmissionsOpen:response.data[0].admissionsOpen}
                    );
                
                // console.log(this.state.ProgramsList );  
            })
            .catch((error) => console.error('Failed to retrieve universities:', error));

            this.intervalId = setInterval(this.nextImage, 2000);



      }


    render(){
        
        return(
            <div className='Review'>
                <h>{this.state.review}</h>
                <p> ---- {this.state.reviewer}</p>
                

              
            </div>
        )
    }
}

export default Review;

