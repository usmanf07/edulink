import React, { useRef } from 'react';
import "./buttons_bar.css";

class University_Description extends React.Component {

    constructor(){
        super();
        
    }
    render(){
        return (
            <div className="buttons_bar" id="">
            
            <button className="button_bar_btns">Add To Favorites</button>

            <button className="button_bar_btns">Apply Now</button>
          
          </div>

        )
    }
}
export default University_Description;