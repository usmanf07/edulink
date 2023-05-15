import React from 'react';
import "./buttons_bar.css";

class University_Description extends React.Component {

    constructor(props){
        super(props);
        this.state={
          name : props.name,
        }
          
        

    }
    showAppliedStudents = () =>{
      
      this.props.navigate(`/SingleInstitutePage/${this.name}/AppliedStudents`);
    }

    addProgram = () => {
      this.props.onAddProgram();
    }

    render(){
        return (
            <div className="buttons_bar" id="">

            <button className="button_bar_btns" onClick={this.showAppliedStudents} >View Applied Students</button>

            <button className="button_bar_btns" onClick={this.addProgram}>Add A Program</button>

          </div>

        )
    }
}

export default University_Description;
