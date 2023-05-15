import React, { useRef } from 'react';
import "./Body.css";
import BodyA from './bodyA';
import BodyB from './bodyB'


class Body extends React.Component{
    constructor(props){
        super(props);
        this.state = { name: props.name,update:props.update}

    }



    componentDidUpdate(prevProps) {
        if (prevProps.update !== this.props.update) {
            this.setState({ update: this.props.update });

        }
        if(prevProps.name!==this.props.name)
        {
            this.setState({ name: this.props.name});
        }
    }

    render(){
        return(
            <div className='body'>


                <div className='bodyA'>
                <BodyA closeDeadline={this.props.closeDeadline} name ={this.state.name} update={this.state.update} onAddDomain={this.props.onAddDomain} onaddApply={this.props.onaddApply}/>

                </div>

                <div className='bodyB'>
                <BodyB name ={this.state.name} />
                </div>


            </div>
        )
    }
}

export default Body;
