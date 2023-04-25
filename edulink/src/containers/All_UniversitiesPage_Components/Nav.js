import "./Nav.css";
import React from 'react'
import ReactDOM from 'react-dom'
import logo from '../../assets/logosmallwhite-1@2x.png'

class Nav extends React.Component{

  showNavbar=()=> {
    var s = document.getElementById('navbar');
    s.style.display = "flex";
  }

  render(){
    return (
      <div className='MainNavDiv'>

          <div className="lines3">
          <div className="IconLogoDiv"><img className="logoSmallWhite1Icon" alt="" src={logo}></img>  </div>
          <svg onClick={this.showNavbar} width="35px" height="35px" viewBox="0 0 16.00 16.00" version="1.1" fill="#ffffff" stroke="#ffffff" stroke-width="0.00016"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill="#ffffff" d="M0 1h3v2h-3v-2z"></path> <path fill="#ffffff" d="M0 5h3v2h-3v-2z"></path> <path fill="#ffffff" d="M0 9h3v2h-3v-2z"></path> <path fill="#ffffff" d="M0 13h3v2h-3v-2z"></path> <path fill="#ffffff" d="M4 1h12v2h-12v-2z"></path> <path fill="#ffffff" d="M4 5h12v2h-12v-2z"></path> <path fill="#ffffff" d="M4 9h12v2h-12v-2z"></path> <path fill="#ffffff" d="M4 13h12v2h-12v-2z"></path> </g></svg>
          </div>
        
        <nav className="nav" id="navbar">
  
          <img className="logoSmallWhite1Icon" alt="" src={logo}></img>

         {/* <button className="lines3"> <img className="logoSmallWhite1Icon" alt="" src="C:\Users\Fatima Siddiqui\Downloads\lines3.jpeg"></img></button> */}
          
          <div className="navElements" id="nav_elements">
            <button className="whatIsEdulink">What is eduLink?</button>
            <button className="findInstitutions">Find Institutions</button>
            <button className="contact">Contact</button>
            <button className="eduinstitute">eduInstitute</button>
          </div>

          <div className="groupParent" id="nav_signin_signout_group">
            
            <button className="signIn">Sign in</button>

            <button className="vectorParent">Sign up</button>
          
          </div>

        
         
           
  
        </nav>
      </div>
      
    );
  }
}



export default Nav;
