import"./Body_Part1.css";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Link,useNavigate } from 'react-router-dom';


class Body_Part1_AllUniPage extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      id: 1,

      Universities_src:[],
      University_Info : [],
    }
  }

  SingleUniversityPage = (instituteName) => {
    alert("oiuytfr");
    // this.props.navigate('/temp2');
  }


  componentDidMount() {
    axios.get('http://localhost:8000/university')
      .then((response) => {
        console.log('Universities:', response.data);
        this.setState({ Universities_src: response.data });
        
       const placesArray = this.state.Universities_src.map((item, index) => {
      return {
        src: "http://localhost:8000/images/"+ item.imageName,
        city: item.address,
        name: item.name,
      };
    });

    // set the state with the new placesArray
    this.setState({ University_Info: placesArray });


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
                 <div onClick={()=>this.SingleUniversityPage(row.name)}>
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
                <div onClick={()=>this.SingleUniversityPage(row.name)}>
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
                  <div onClick={()=>this.SingleUniversityPage(row.name)}>
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

export function navigateTo(prop) {
  const navigate = useNavigate();
  return(<Body_Part1_AllUniPage navigate={navigate} ></Body_Part1_AllUniPage>)
}


export default Body_Part1_AllUniPage;
