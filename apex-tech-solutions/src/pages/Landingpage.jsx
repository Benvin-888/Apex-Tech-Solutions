import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Landingpage.css";

function Landingpage() {
  const navigate = useNavigate();

  useEffect(() => {
    const container = document.querySelector(".landing-container");

    // 🪶 Floating particles
    for (let i = 0; i < 10; i++) {
      const particle = document.createElement("div");
      particle.classList.add("particle");
      particle.style.width = `${Math.random() * 8 + 2}px`;
      particle.style.height = particle.style.width;
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.animationDelay = `${Math.random() * 5}s`;
      container.appendChild(particle);
    }

    // ⏳ Fade out the loader after 8s
    const fadeTimer = setTimeout(() => {
      const loader = document.querySelector(".loader");
      if (loader) loader.classList.add("fade-out");
    }, 5000);

    // 🔁 Redirect to Homepage after 6s
    const navTimer = setTimeout(() => {
      navigate("/Homepage");
    }, 5000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(navTimer);
    };
  }, [navigate]);

  return (
    <div className="landing-container">
      <div className="logo-wrapper">
        <div className="logo-container">
          <img
            src="/logo/logo.jpg"
            alt="Apex Tech Solutions Logo"
            className="landing-logo"
          />
        </div>
      </div>

      <h1 className="landing-title">
        Welcome to <br />
        Apex Tech Solutions
      </h1>

      <p className="landing-subtitle">
        Empowering innovation and transforming ideas into digital realities.
        Explore the next generation of technology experiences with Apex Tech
        Solutions.
      </p>

      {/* 🔁 Loader Animation */}
      <div className="loader">
        <div className="circle">
          <div className="dot"></div>
          <div className="outline"></div>
        </div>
        <div className="circle">
          <div className="dot"></div>
          <div className="outline"></div>
        </div>
        <div className="circle">
          <div className="dot"></div>
          <div className="outline"></div>
        </div>
        <div className="circle">
          <div className="dot"></div>
          <div className="outline"></div>
        </div>
        <div className="circle">
          <div className="dot"></div>
          <div className="outline"></div>
        </div>
      </div>
    </div>
  );
}

export default Landingpage;
