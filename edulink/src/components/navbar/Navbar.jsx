import React from 'react'
import {RiMenu3Line, RiCloseLine} from 'react-icons/ri';
import './navbar.css'
import logo from '../../assets/logo.svg'

const Navbar = () => {
  return (
    <div className="edulink_navbar">
      <div className="edulink_navbar-links">
          <div className="edulink_navbar-links_logo">
              <img src={logo} alt="logo"/>
          </div>
          <div className="edulink_navbar-links_container">
              <p><a href="#home">Home</a></p>
              <p><a href="#home">What is eduLink?</a></p>
          </div>
      </div>
    </div>
  )
}

export default Navbar