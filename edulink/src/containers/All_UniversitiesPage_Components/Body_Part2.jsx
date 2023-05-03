import"./Body_Part2.css";
import React from 'react'

class Body_Part2_AllUniPage extends React.Component{

  constructor(props) {
    super(props);
    this.state = {}
  }
  showSlidebar=()=> {
    var s = document.getElementById('sliderbar_AllUniPage');
    s.style.display = "flex";
  }

  hideSlidebar=()=> {
    var s = document.getElementById('sliderbar_AllUniPage');
    s.style.display = "none";
  }

  render(){
    const { id, University_Info } = this.state;

    return(

      <div className="Body_Part2_AllUniPage" id="Body" Body>



      
      
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

      <div className="sliderbar_AllUniPage" id="sliderbar_AllUniPage" Sidebar>

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
            <h3 className="exploreByCategory">Explore By Category</h3>
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
            <h3 className="HowToApply" >How to Apply</h3>
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

export default Body_Part2_AllUniPage;
