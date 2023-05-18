import React, { useState, useEffect } from 'react'
import {RiMenu3Line, RiCloseLine} from 'react-icons/ri';
import './navbar.css'
import logo from '../../assets/logo.svg'
import logowhite from '../../assets/logo-w-bg.svg'

import { Link, useNavigate } from 'react-router-dom';
import { FaCaretDown } from 'react-icons/fa';
import axios from 'axios';


const Navbar = (props) => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const history = useNavigate();
  const [isLogin, setIsLogin] = useState(sessionStorage.getItem('email'));
  const [name, setName] = useState('');
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
  
  const [email, setEmail] = useState('');

  
  

  useEffect(() => {
    // Get sessionId and email from sessionStorage
    const sessionId = sessionStorage.getItem('sessionId');
    const email = sessionStorage.getItem('email');
    const isGoogle = sessionStorage.getItem('isGoogle');
    //alert(email)
   
    console.log(email)
   
    if(email === null) {  
      setIsLogin(false);
      console.error('User is not logged in.'); // Log error message
      return;
    }
    else{
      axios.get(`http://localhost:8000/users/${email}`)
      .then(res => {
        
        const userData = res.data;
        setName(userData.fullName);
        setEmail(email);
        setIsLogin(true);
      })
      .catch(err => {
        console.log(err);
      });
  
      
    }
    
  }, []);

  const navigate = useNavigate();
  const moveToSignUp=() =>{
    navigate("/signup");


  }
  const navbarClassNames = `edulink__navbar ${isSticky ? 'sticky' : ''}`;
  const searchClassNames = `edulink__navbar-search ${showSearchBar ? 'visible' : ''}`;

  const handleLogout = () => {
  
  history('/login', { replace: true } ); // use replace instead of push to prevent going back to the previous page
 
};
  const [showDropdown, setShowDropdown] = useState(false);
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };
  return (
    <div className={navbarClassNames}>
      <div>
      <div className="edulink__navbar-links">
        <div className="edulink__navbar-links_logo">
          {!showSearchBar &&(<Link to="/home"><img src={logo} /></Link>)}
          {showSearchBar &&(<Link to="/home"><img src={logowhite} /></Link>)}
        </div>
        <div className="edulink__navbar-links_container">
          <p><a href="#wedulink">What is edulink?</a></p>
          {/* <p><a href="#possibility">Find Institutes</a></p>
          <p><a href="#features">Contact</a></p> */}
          {!isLogin ? (
              <p>
               <Link to="/signup"><a href="#">eduInstitute</a></Link>
              </p>
            ) : (
              <p>
                
                <Link to="/UserApplications"><a href="#institute" >My Applications</a></Link>
                <Link to="/EntryTest"><a href="#entrytest" >Entry Test Prep</a></Link>
                <Link to="/Payment"><a href="#membership" >Membership</a></Link>
              </p>
            )}

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
      {!isLogin && (
      <div className="edulink__navbar-sign">
        <Link to="/login"><p>Sign in</p></Link>
        <button type="button" onClick={moveToSignUp}>Sign up</button>
      </div>)}
      {isLogin && (
        <div className="edulink__navbar-sign">
        <div className="dropdown">
        <button className="dropbtn" onClick={toggleDropdown}>
            Hi, {name}
            
            <FaCaretDown />
          </button>
          
          {showDropdown && (
            <div className="dropdown-content">
         
              <Link to="/EditProfile"><a>Edit Profile</a></Link>
              <a href="#">Contact</a>
            </div>
          )}
        </div>
        <button type="button" onClick={handleLogout}>
          Logout
        </button>
      </div>)}
      </div>


      </div>
      <div>

      {showSearchBar && (

        <div className="edulink__navbar-categories">
          <hr></hr>
          <div className='edulink__navbar-categories_links'>
          <Link to="/Payment"><a href="#allinstitutes" >All Institutes</a></Link>
              <p><a href="#wedulink">Private Sector</a></p>
              <p><a href="#possibility">Public Sector</a></p>
              <p><a href="#features">Overseas</a></p>
              <p><a href="#institute">Top Ranked</a></p>
              <p><a href="#institute">Scholarships</a></p>
              <p><a href="#institute">Sample Entry Tests</a></p>
              
              <p><a href="#fsecond">Recent Programs</a></p>
              
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
          <Link to="/login"><p>Sign in</p></Link>
        <button type="button" onClick={moveToSignUp}>Sign up</button>
          </div>
        </div>
        )}
      </div>
    </div>

  );
};

export default Navbar;
