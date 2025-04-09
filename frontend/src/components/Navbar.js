import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img
          src="https://www.shutterstock.com/image-vector/calorie-calculator-icon-line-isolated-600nw-1251221197.jpg"
          alt="Logo"
          className="logo"
        />
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/predict" className="nav-link">Predict</Link>
      </div>
    </nav>
  );
}

export default Navbar;
