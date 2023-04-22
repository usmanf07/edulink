import React, { useState } from 'react'
import {RiMenu3Line, RiCloseLine} from 'react-icons/ri';
import './navbar.css'
import logo from '../../assets/logo.svg'

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);

  return (
    <div className="edulink__navbar">
      <div className="edulink__navbar-links">
        <div className="edulink__navbar-links_logo">
          <img src={logo} />
        </div>
        <div className="edulink__navbar-links_container">
          <p><a href="#wedulink">What is edulink?</a></p>
          <p><a href="#possibility">Find Institutes</a></p>
          <p><a href="#features">Contact</a></p>
          <p><a href="#blog">eduInstitute</a></p>
        </div>
      </div>
      <div className="edulink__navbar-sign">
        <p>Sign in</p>
        <button type="button">Sign up</button>
      </div>
      <div className="edulink__navbar-menu">
        {toggleMenu
          ? <RiCloseLine color="#fff" size={27} onClick={() => setToggleMenu(false)} />
          : <RiMenu3Line color="#fff" size={27} onClick={() => setToggleMenu(true)} />}
        {toggleMenu && (
        <div className="edulink__navbar-menu_container scale-up-center">
          <div className="edulink__navbar-menu_container-links">
            <p><a href="#wedulink">What is edulink?</a></p>
            <p><a href="#possibility">Find Institutes</a></p>
            <p><a href="#features">Contact</a></p>
            <p><a href="#blog">eduInstitute</a></p>
          </div>
          <div className="edulink__navbar-menu_container-links-sign">
            <p>Sign in</p>
            <button type="button">Sign up</button>
          </div>
        </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;