import React from 'react';
import "./Review.css";
// import SimpleSlider from '../header/SimpleSlider';

class Review extends React.Component{
    constructor(){
        super();
        this.state = 
        {
          review : "FAST University was one of the top contenders even before I came to see it, and now it is my home away from home. The university staff are amazing and helpful, coursework is very interesting, and the town itself offers everything you need.",
          reviewer: "Helene Husebo, 2nd Year Student, Computer Science",
        }
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

