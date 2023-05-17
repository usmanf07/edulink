import"./Body_Part1.css";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Link,useNavigate } from 'react-router-dom';
import AllUniversity from "../../AllUniversity";
import  { sharedVariable }  from './sharedFile';

class Body_Part1_AllUniPage extends React.Component{

  constructor(props) {
    super(props);
    // alert(props.color);
    this.state = {
      id: 1,

      Universities_src:[],
      University_Info : [],
    }
  }

  SingleUniversityPage = (instituteName) => {
    // instituteName = instituteName.replace(/\s+/g, '');
    // alert(instituteName);
    this.props.navigate(`/SingleInstitutePage/${instituteName}`);

  }


  componentDidMount() {
      // console.log({sharedVariable})
    this.fetchData(); // Fetch data initially

    // Start the interval after the component has mounted
    this.interval = setInterval(() => {
      this.fetchData(); 
    }, 100);
  }

  componentWillUnmount() {
    // Clear the interval when the component is unmounted
    clearInterval(this.interval);
  }

  fetchData() {
   
    axios.get('http://localhost:8000/university')
      .then((response) => {
        this.setState({ Universities_src: response.data });
      
        console.log( response.data[0].type ==  sharedVariable )

        const placesArray = this.state.Universities_src.map((item, index) => {
          if (
            // item.Locationdisplay === 'show' 
          // &&
          item.Namedisplay === 'show' &&
          
          (item.type == sharedVariable || sharedVariable == '')
          ) {
            return {
              src: "http://localhost:8000/images/" + item.imageName,
              city: item.address,
              name: item.name,
            };
          } else {
            return null; // Skip universities with display not set to 'show'
          }
        });

        // Remove null values from placesArray
        const filteredPlacesArray = placesArray.filter((item) => item !== null);

        // set the state with the new filteredPlacesArray
        this.setState({ University_Info: filteredPlacesArray });
      })
      .catch((error) => console.error('Failed to retrieve universities:', error));
  }





  render(){
    const { id, University_Info } = this.state;

    return(

      <div className="universities" id="University_Div">


        <table className="uni_table">

          {University_Info.map((row,index, next) => (
            index%3 === 0 &&
            (<tr key={index}>

              {
                index < next.length &&
                <td className="i1">
                <div onClick={()=>this.SingleUniversityPage(row.name)}>
                  <img className="th1Icon" alt="" src={row.src} />
                  <div className="universityAbcCityContainer">
                    <p className="universityAbc">{row.name}</p>
                    <p className="city"> <span>{row.city}</span></p>
                  </div>
                </div>
                </td>

              }


              {
                (index+1) < next.length &&
                <td className="i1">
                 <div onClick={()=>this.SingleUniversityPage(next[index+1].name)}>
                  <img className="th1Icon" alt="" src={next[index+1].src} />
                  <div className="universityAbcCityContainer">
                    <p className="universityAbc">{next[index+1].name}</p>
                    <p className="city"> <span>{next[index+1].city}</span></p>
                  </div>
                </div>
                </td>

              }

              {
                index+2 < next.length &&
                <td className="i1">
                <div onClick={()=>this.SingleUniversityPage(next[index+2].name)}>
                  <img className="th1Icon" alt="" src={next[index+2].src} />
                  <div className="universityAbcCityContainer">
                    <p className="universityAbc">{next[index+2].name}</p>
                    <p className="city"> <span>{next[index+2].city}</span></p>
                  </div>
                </div>
                </td>
              }



            </tr>)

          )
          )}

        </table>




        <table className="phone_uni_table">

          {University_Info.map((row,index, next) => (
            index%2 === 0 &&
            (<tr key={index}>

              {
                index < next.length &&
                <td className="i1">
                 <div onClick={()=>this.SingleUniversityPage(row.name)}>
                  <img className="th1Icon" alt="" src={row.src} />
                  <div className="universityAbcCityContainer">
                    <p className="universityAbc">{row.name}</p>
                    <p className="city"> <span>{row.city}</span></p>
                  </div>
                </div>
                </td>

              }


              {
                (index+1) < next.length &&
                <td className="i1">
                  <div onClick={()=>this.SingleUniversityPage(next[index+1].name)}>
                  <img className="th1Icon" alt="" src={next[index+1].src} />
                  <div className="universityAbcCityContainer">
                    <p className="universityAbc">{next[index+1].name}</p>
                    <p className="city"> <span>{next[index+1].city}</span></p>
                  </div>
                </div>
                </td>

              }


            </tr>)

          )
          )}

        </table>

      </div>

    );
  }
}
export default Body_Part1_AllUniPage;
