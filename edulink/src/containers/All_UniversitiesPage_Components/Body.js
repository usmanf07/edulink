import"./Body.css";
import React from 'react'
import Body_Part1 from './Body_Part1';
import Body_Part2 from './Body_Part2';
import AllUniversity from "../../AllUniversity";

class Body extends React.Component{

  constructor(props) {
    super(props);

    this.state = {

    }
  }

  render(){
    // const { id, University_Info } = this.state;

    return(

      <div className="body_AllUniversityPage" id="Body" Body>

        <div className="universities_AllUniversityPage" >

        <Body_Part1 navigate ={this.props.navigate}/>

        {/* <AllUniversity/> */}

        </div>
        <div className="slidebar_AllUniversityPage"> <Body_Part2 /> </div>

      </div>

    );
  }
}

export default Body;
