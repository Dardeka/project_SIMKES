import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-section">
      <div className="footer-content-wrapper">
        <div className="footer-about">
          <h3 className="footer-title">SIMKES</h3>
          <p className="footer-text-small">
            SIMKES adalah rumah sakit yang didirikan oleh Ryan Love Andris yang sudah hadir sejak 2008. 
            SIMKES berkomitmen untuk memberikan layanan terbaik.
          </p>
          <p className="footer-contact">(+62) 12345678910</p>
          <p className="footer-location">Jalan Geboy Mujaer Nang Ning Nong</p>
        </div>
        <div className="footer-social">
          <h3 className="footer-title">Ikuti Kami</h3>
          <div className="social-icons">
            {/* Placeholder Icons */}
            <i className="fa fa-facebook"></i> 
            <i className="fa fa-instagram"></i> 
            <i className="fa fa-youtube"></i>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;