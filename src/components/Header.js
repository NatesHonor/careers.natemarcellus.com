import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <div className="header-left">
        <h1>Nates Services</h1>
      </div>
      <nav className="header-center">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/browse">Browse</Link></li>
          <li><Link to="/listings">Careers</Link></li>
          <li><Link to="/staff">Current Staff</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
      </nav>
      <div className="header-right">
        <a href="https://natemarcellus.com/login" className="login-button">Login</a>
      </div>
    </header>
  );
}

export default Header;
