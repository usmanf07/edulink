import React, { useState, useEffect } from 'react'
import {RiMenu3Line, RiCloseLine} from 'react-icons/ri';
import './navbar.css'
import logo from '../../assets/logo.svg'
import logowhite from '../../assets/logo-w-bg.svg'

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.pageYOffset;
      setIsSticky(scrollPosition > 100);
      setShowSearchBar(scrollPosition > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navbarClassNames = `edulink__navbar ${isSticky ? 'sticky' : ''}`;
  const searchClassNames = `edulink__navbar-search ${showSearchBar ? 'visible' : ''}`;

  return (
    <div className={navbarClassNames}>
      <div>
      <div className="edulink__navbar-links">
        <div className="edulink__navbar-links_logo">
          {!showSearchBar &&(<img src={logo} />)}
          {showSearchBar &&(<img src={logowhite} />)}
        </div>
        <div className="edulink__navbar-links_container">
          <p><a href="#wedulink">What is edulink?</a></p>
          <p><a href="#possibility">Find Institutes</a></p>
          <p><a href="#features">Contact</a></p>
          <p><a href="#institute">eduInstitute</a></p>
        </div>
        {showSearchBar && <div className={searchClassNames}>
        <div className='edulink__navbar-search_input'>
          <input type="text" placeholder="Search from Over 2000+ Institutes Worldwide" />
        </div>
        <div className="edulink__navbar-search_icon">
          <svg fill="#000000" width="25px" height="25px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
              <path d="M12.027 9.92L16 13.95 14 16l-4.075-3.976A6.465 6.465 0 0 1 6.5 13C2.91 13 0 10.083 0 6.5 0 2.91 2.917 0 6.5 0 10.09 0 13 2.917 13 6.5a6.463 6.463 0 0 1-.973 3.42zM1.997 6.452c0 2.48 2.014 4.5 4.5 4.5 2.48 0 4.5-2.015 4.5-4.5 0-2.48-2.015-4.5-4.5-4.5-2.48 0-4.5 2.014-4.5 4.5z" fill-rule="evenodd"/>
          </svg>
        </div>
      </div>}
      <div className="edulink__navbar-sign">
        <p>Sign in</p>
        <button type="button">Sign up</button>
      </div>
      </div>
      
      
      </div>
      <div>
      
      {showSearchBar && (
        
        <div className="edulink__navbar-categories">
          <hr></hr>
          <div className='edulink__navbar-categories_links'>
              <p><a href="#institute">Latest News</a></p>
              <p><a href="#wedulink">Private Sector</a></p>
              <p><a href="#possibility">Public Sector</a></p>
              <p><a href="#features">Overseas</a></p>
              <p><a href="#institute">Top Ranked</a></p>
              <p><a href="#institute">Scholarships</a></p>
              <p><a href="#institute">Sample Entry Tests</a></p>
              <p><a href="#institute">Registration Form</a></p>
              <p><a href="#institute">Recent Admissions</a></p>
              <p><a href="#institute">Blog</a></p>
          </div>
        </div>
      )}
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