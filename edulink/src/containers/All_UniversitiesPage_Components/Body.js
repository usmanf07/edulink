import"./Body.css";
import React from 'react'
import ReactDOM from 'react-dom'

import dummy1 from '../../assets/th (1).jpeg'
import dummy2 from '../../assets/th (2).jpeg'
import dummy3 from '../../assets/th (3).jpeg'
import dummy4 from '../../assets/th (4).jpeg'
import dummy5 from '../../assets/th (5).jpeg'

class Body extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      id: 1,

      University_Info : [
        {src: dummy1, name: 'ABC', city:'123'},
        {src: dummy2, name: 'DEF', city:'456'},
        {src: dummy3, name: 'GHI', city:'789'},

        {src: dummy4, name: 'JKL', city:'123'},
        {src: dummy1, name: 'MNO', city:'456'},
        {src: dummy5, name: 'PQR', city:'789'},

        {src: dummy1, name: 'ABC', city:'123'},
        {src: dummy2, name: 'DEF', city:'456'},
        {src: dummy3, name: 'GHI', city:'789'},
        
        {src: dummy3, name: 'GHI', city:'789'},
        {src: dummy2, name: 'DEF', city:'456'},
        
      ]

    }
  }
  showSlidebar=()=> {
    var s = document.getElementById('Sidebar');
    s.style.display = "flex";
  }

  hideSlidebar=()=> {
    var s = document.getElementById('Sidebar');
    s.style.display = "none";
  }

  render(){
    const { id, University_Info } = this.state;

    return(

      <div className="body" id="Body" Body>

      <div className="universities" id="University_Div">


        <table className="uni_table"> 
          
          {University_Info.map((row,index, next) => (
            index%3 === 0 && 
            (<tr key={index}>

              {
                index < next.length &&
                <td>
                <div className="i1">
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
                <td>
                <div className="i1">
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
                <td>
                <div className="i1">
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
                <td>
                <div className="i1">
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
                <td>
                <div className="i1">
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



      
      
      <div className="Slidebar_Filter">
        <h2 className="svgh2_slidebar">Filters</h2>
        <button className="svgBtn_slidebar" onClick={this.showSlidebar}  >
          <svg width="50px" height="50px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
            <g id="SVGRepo_iconCarrier"> 
            <path d="M14 5C14 3.89543 13.1046 3 12 3C10.8954 3 10 3.89543 10 5M14 5C14 6.10457 13.1046 7 12 7C10.8954 7 10 6.10457 10 5M14 5H20M10 5L4 5M16 12C16 13.1046 16.8954 14 18 14C19.1046 14 20 13.1046 20 12C20 10.8954 19.1046 10 18 10C16.8954 10 16 10.8954 16 12ZM16 12H4M8 19C8 17.8954 7.10457 17 6 17C4.89543 17 4 17.8954 4 19C4 20.1046 4.89543 21 6 21C7.10457 21 8 20.1046 8 19ZM8 19H20" stroke="#040c18" stroke-width="1.5" stroke-linecap="round"></path>
            </g>
          </svg>
        </button>
      </div>

      <div className="sliderbar" id="Sidebar" Sidebar>

        <div className="crossBtn">
          {/* <button onClick={this.hideSlidebar}> */}
          <svg onClick={this.hideSlidebar} fill="#ffffff" width="40px" height="40px" viewBox="0 0 1024 1024" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M697.4 759.2l61.8-61.8L573.8 512l185.4-185.4-61.8-61.8L512 450.2 326.6 264.8l-61.8 61.8L450.2 512 264.8 697.4l61.8 61.8L512 573.8z"></path></g></svg>
          {/* </button> */}
        </div>
        
        <div className="SidebarFilterArea">

          <div className="location" id="Location_Sidebar" Location_Sidebar >
            <h3 className="exploreByLocation" id="Location_mainlabel" Location_mainlabel> Explore By Location </h3>
            <input className="enterCityOr" id="search_location_text" search_location_text placeholder="Enter City or Country" />
          </div>

          <div className="category" id="Category_Sidebar">
            <div className="exploreByCategory">Explore By Category</div>
            <div className="points1" id="Category_div" Category_div>
              <ul>

              <li>
                <label className="publicInstitutes" id="category_label" category_label> Public Institutes </label>
              </li>
              
              <li>
              <label className="privateInstitutes" id="category_label" category_label> Private Institutes </label>
              </li>

              <li>
              <label className="overseasInstitutes" id="category_label" category_label> Overseas Institutes </label>
              </li>

              </ul>

            </div>
          </div>

          <div className="exploreParent" id="How_To_Apply" How_To_Apply>
            <div className="HowToApply" >How to Apply</div>
              <ul>
                <li>
                <label className="searchForInstitute" id="How_to_apply_label" How_to_apply_label> Search For Institute</label>
                </li>

                <li>
                <label className="createAccount" id="How_to_apply_label" How_to_apply_label> Create Account</label>
                </li>

                <li>
                <label className="gatherInfomation" id="How_to_apply_label" How_to_apply_label> Gather Infomation</label>
                </li>

                <li>
                <label className="applyForInstitute" id="How_to_apply_label" How_to_apply_label> Apply For institute</label>
                </li>

              </ul>

            </div>

        </div>
          
        </div>
       
      
        
      </div>

    );
  }
}

export default Body;
