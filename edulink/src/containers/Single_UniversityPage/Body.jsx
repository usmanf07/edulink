import React, { useRef } from 'react';
import "./Body.css";
import BodyA from './bodyA';
import BodyB from './bodyB';
class Body extends React.Component{
    constructor(props){
        super(props);
        this.state = { name: props.name,}
       
    }

    render(){
        return(
            <div className='body'>


                <div className='bodyA'>
                <BodyA  name ={this.state.name} />

                </div>

                <div className='bodyB'>
                <BodyB name ={this.state.name} />
                </div>

               
            </div>
        )
    }
}

export default Body;