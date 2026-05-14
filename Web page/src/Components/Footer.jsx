import React from "react";
import { FiHeart } from "react-icons/fi";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-logo">
            <span className="footer-logo-text">whitepace</span>
          </div>
          <p className="footer-copyright">
            &copy; {new Date().getFullYear()} Whitepace. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;



