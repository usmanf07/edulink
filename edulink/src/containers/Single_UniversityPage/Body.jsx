import React, { useRef } from 'react';
import "./Body.css";
import BodyA from './bodyA';
import BodyB from './bodyB';
class Body extends React.Component{
    constructor(){
        super();
        this.state = {}
    }

    render(){
        return(
            <div className='body'>


                <div className='bodyA'>
                <BodyA />

                </div>

                <div className='bodyB'>
                <BodyB/>
                </div>

               
            </div>
        )
    }
}

export default Body;