import React from 'react';
import './Navbar.css';

const Navbar = () => {
  return (
    <header className="navbar-container">
      {}
      <div className="navbar-content-wrapper"> 
        <div className="navbar-left">
          <div className="simkes-logo">
            <span className="logo-text">SIMKES</span>
          </div>
        </div>
        <div className="navbar-right">
          <nav className="navbar-links">
            <a href="#home">Cari Dokter</a>
            <a href="#profil">Fasilitas</a>
          </nav>
          <button className="navbar-login-button">Login</button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;