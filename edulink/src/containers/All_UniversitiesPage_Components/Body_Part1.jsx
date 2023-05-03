import"./Body_Part1.css";
import React from 'react'

import dummy1 from '../../assets/th (1).jpeg'
import dummy2 from '../../assets/th (2).jpeg'
import dummy3 from '../../assets/th (3).jpeg'
import dummy4 from '../../assets/th (4).jpeg'
import dummy5 from '../../assets/th (5).jpeg'
import t1 from '../../assets/logo.svg';

class Body_Part1_AllUniPage extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      id: 1,

      University_Info : [
        {src: dummy1, name: 'ABC', city:'123'},
        {src: dummy2, name: 'DEF', city:'456'},
        {src: t1, name: 'GHI', city:'789'},

        {src: t1, name: 'JKL', city:'123'},
        {src: dummy1, name: 'MNO', city:'456'},
        {src: dummy5, name: 'PQR', city:'789'},

        {src: dummy1, name: 'ABC', city:'123'},
        {src: dummy2, name: 'DEF', city:'456'},
        {src: dummy3, name: 'GHI', city:'789'},
        
        {src: t1, name: 'GHI', city:'789'},
        {src: dummy2, name: 'DEF', city:'456'},
        
      ]

    }
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
                <div >
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
                <div>
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
                <div >
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
                <div>
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
                <div>
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
