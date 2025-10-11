import React from "react";
import { Bug, Instagram, Twitter, MessageCircle } from "lucide-react";
import "../styles/Fallback.css";

const Fallback = () => {
  return (
    <div className="fallback-container">
      <div className="fallback-box">
        {/* ✅ Render icon as JSX element */}
        <Bug className="bug-icon" size={70} />

        <h1>Error</h1>
        <p className="fallback-subtitle">► Failed to fetch</p>
        <p className="contact-text">Contact us below</p>

        <div className="socials">
          {/* ✅ Don't try to render icons as text */}
          <a href="#" className="social-link">
            <MessageCircle size={18} style={{ marginRight: "6px" }} /> Discord
          </a>
          <a href="#" className="social-link">
            <Instagram size={18} style={{ marginRight: "6px" }} /> Instagram
          </a>
          <a href="#" className="social-link">
            <Twitter size={18} style={{ marginRight: "6px" }} /> Twitter/X
          </a>
        </div>
      </div>
    </div>
  );
};

export default Fallback;
