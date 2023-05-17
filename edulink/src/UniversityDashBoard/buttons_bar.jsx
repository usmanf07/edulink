import React from 'react';
import "./buttons_bar.css";

class University_Description extends React.Component {

    constructor(props){
        super(props);
        this.state={
          name : props.name,
        }



    }

    showmaketest = () =>
    {
      this.props.navigate(`/universitydash/${this.name}/maketest`);

    }
    showAppliedStudents = () =>{

       
      this.props.navigate(`/universitydash/${this.props.name}/AppliedStudents`);
    }

    addProgram = () => {
      this.props.onAddProgram();
    }
    showalltest =() =>
    {
      this.props.navigate(`/universitydash/${this.name}/showtest`);


    }

    render(){
        return (
            <div className="buttons_bar" id="">

            <button className="button_bar_btns" onClick={this.showAppliedStudents} >View Applied Students</button>

            <button className="button_bar_btns" onClick={this.addProgram}>Add A Program</button>
            <button className="button_bar_btns" onClick={this.showmaketest}>Make a test</button>
            <button className="button_bar_btns" onClick={this.showalltest}>show all texts</button>
          </div>

        )
    }
}

export default University_Description;
