import React from 'react';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <div className="header-left">
        <h1>Nates Services Careers</h1>
      </div>
      <nav className="header-center">
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/browse">Browse</a></li>
          <li><a href="/careers">Careers</a></li>
          <li><a href="/current-staff">Current Staff</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>
      </nav>
      <div className="header-right">
        <a href="https://natemarcellus.com/login" className="login-button">Login</a>
      </div>
    </header>
  );
}

export default Header;
