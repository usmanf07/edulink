import React from 'react';
import logo from '../../assets/logo.svg'
import './footer.css';

const Footer = () => (
  <div className="edulink__footer">
    <div className="edulink__header-content">
      <h1 className="gradient_text">Discover eduInstitutes for Institutes</h1>
    </div>

    <div className="edulink__footer-btn">
      <p>Discover Now!</p>
    </div>

    <div className="edulink__footer-links">
      <div className="edulink__footer-links_logo">
        <img src={logo} alt="edulinklogo" />
        <p>375, Milaad Street, Johar Town, Lahore, PK<br /> All Rights Reserved</p>
      </div>
      <div className="edulink__footer-links_div">
        <h4>Links</h4>
        <p>Institutes</p>
        <p>Social Media</p>
        <p>Help Center</p>
        <p>Contact</p>
      </div>
      <div className="edulink__footer-links_div">
        <h4>Company</h4>
        <p>Terms & Conditions </p>
        <p>Privacy Policy</p>
        <p>Contact</p>
      </div>
      <div className="edulink__footer-links_div">
        <h4>Get in touch!</h4>
        <p>375, Milaad Street, Johar Town, Lahore, PK</p>
        <p>03212345523</p>
        <p>csr@edulink.net</p>
      </div>
    </div>

    <div className="edulink__footer-copyright">
      <p>@2023 eduLink. All rights reserved.</p>
    </div>
  </div>
);

export default Footer;