import React from "react";
import { Bug, Instagram, Twitter, MessageCircle, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "../styles/Fallback.css";


const Fallback = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/Homepage");
  };

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
          <a href="https://discord.com/" className="social-link discord" target="_blank" rel="noopener noreferrer">
            <MessageCircle size={18} style={{ marginRight: "6px" }} /> Discord
          </a>
          <a href="https://instagram.com/" className="social-link instagram" target="_blank" rel="noopener noreferrer">
            <Instagram size={18} style={{ marginRight: "6px" }} /> Instagram
          </a>
          <a href="https://twitter.com/" className="social-link twitter" target="_blank" rel="noopener noreferrer">
            <Twitter size={18} style={{ marginRight: "6px" }} /> Twitter/X
          </a>
        </div>

        {/* ✅ New Home Button */}
        <button className="home-button" onClick={handleGoHome}>
          <Home size={20} style={{ marginRight: "8px" }} />
          Go Back Home
        </button>
      </div>
    </div>
  );
};

export default Fallback;