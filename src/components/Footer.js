import React from 'react';
import './Footer.css';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-section">
        <h2>Nates Services</h2>
        <p>Attempting to drive innovation and creativity through design and games for people of <strong><u>ALL</u></strong> ages.</p>
      </div>
      <div className="footer-section">
        <h2>Contact Us</h2>
        <div className="social-media">
          <FaFacebook />
          <FaTwitter />
          <FaInstagram />
          <FaLinkedin />
          <FaYoutube />
        </div>
      </div>
      <div className="footer-section">
        <h2>Subscribe to Newsletters</h2>
        <p>Subscribe to our newsletter to get updates about new jobs.</p>
        <form className="subscribe-form">
          <input type="email" placeholder="Enter your email" />
          <button type="submit">Subscribe</button>
        </form>
      </div>
    </footer>
  );
}

export default Footer;
