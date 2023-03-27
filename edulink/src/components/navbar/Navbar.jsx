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
      </div>
    </div>
  )
}

export default Navbar