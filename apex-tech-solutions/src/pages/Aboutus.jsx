import { useEffect, useRef } from 'react';
import '../styles/Aboutus.css';
import { useNavigate } from "react-router-dom";


function AboutUs() {
  const canvasRef = useRef(null);
  const heroRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    // 3D Background Animation
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Enhanced Particle system
    class Particle {
      constructor() {
        this.reset();
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
      }
      
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.z = Math.random() * 1000;
        this.size = Math.random() * 2 + 1;
        this.speed = Math.random() * 0.5 + 0.1;
      }
      
      update() {
        this.z -= this.speed;
        this.x += this.vx;
        this.y += this.vy;
        
        if (this.z <= 0 || this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
          this.reset();
          this.z = 1000;
        }
      }
      
      draw() {
        const scale = 1000 / (1000 + this.z);
        const x2d = this.x * scale;
        const y2d = this.y * scale;
        const size2d = this.size * scale;
        
        const gradient = ctx.createRadialGradient(x2d, y2d, 0, x2d, y2d, size2d);
        gradient.addColorStop(0, 'rgba(195, 20, 50, 0.8)');
        gradient.addColorStop(1, 'rgba(36, 11, 54, 0)');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x2d, y2d, size2d, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const particles = Array(150).fill().map(() => new Particle());

    function animate() {
      ctx.fillStyle = 'rgba(10, 15, 30, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });
      
      requestAnimationFrame(animate);
    }
    
    animate();

    // Enhanced Intersection Observer with staggered animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('animate-in');
          }, entry.target.dataset.delay || 0);
        }
      });
    }, { threshold: 0.1 });

    // Observe all animated elements with staggered delays
    document.querySelectorAll('.fade-in, .slide-up, .card-3d').forEach((el, index) => {
      el.dataset.delay = index * 100;
      observer.observe(el);
    });

    // Enhanced 3D Card hover effects with glow
    cardRefs.current.forEach(card => {
      if (card) {
        const glow = card.querySelector('.card-glow');
        
        card.addEventListener('mousemove', (e) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          
          const rotateY = (x - centerX) / 15;
          const rotateX = (centerY - y) / 15;
          
          card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.08, 1.08, 1.08)`;
          
          if (glow) {
            glow.style.opacity = '1';
            glow.style.transform = `translate(${x - centerX}px, ${y - centerY}px)`;
          }
        });
        
        card.addEventListener('mouseleave', () => {
          card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
          if (glow) {
            glow.style.opacity = '0';
          }
        });
      }
    });

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  const services = [
    {
      title: "Web Development",
      description: "Custom websites and web applications built with cutting-edge technologies",
      icon: "💻",
      features: ["React/Next.js", "Node.js", "Responsive Design"]
    },
    {
      title: "Mobile Apps",
      description: "Native and cross-platform mobile applications for iOS and Android",
      icon: "📱",
      features: ["Flutter/React Native", "iOS & Android", "App Store Deployment"]
    },
    {
      title: "Web Portfolios",
      description: "Stunning portfolio websites that showcase your work and talent",
      icon: "🎨",
      features: ["Custom Designs", "SEO Optimized", "Fast Loading"]
    },
    {
      title: "Tech Solutions",
      description: "Comprehensive technology solutions for your business needs",
      icon: "⚡",
      features: ["Consulting", "API Integration", "Cloud Solutions"]
    }
  ];

  const addToCardRefs = (el) => {
    if (el && !cardRefs.current.includes(el)) {
      cardRefs.current.push(el);
    }
  };

  return (
    <div className="about-us">
      {/* 3D Background Canvas */}
      <canvas ref={canvasRef} className="background-canvas" />
      
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-logo">
            <img src= "/Logo/logo.jpg" alt="Apex Tech Solutions" />
          </div>
          <ul className="nav-menu">
            <li className="nav-item">
              <a href="/Homepage" className="nav-link">Home</a>
            </li>
            <li className="nav-item">
              <a href="/Aboutus" className="nav-link">About</a>
            </li>
            <li className="nav-item">
              <a href="/Packages" className="nav-link">Services</a>
            </li>
            <li className="nav-item">
              <a href="#portfolio" className="nav-link">Portfolio</a>
            </li>
            <li className="nav-item">
              <a href="#contact" className="nav-link">Contact</a>
            </li>
          </ul>
        </div>
      </nav>

      {/* Hero Section with Gradient Background */}
      <section 
        ref={heroRef} 
        className="hero-section"
        style={{
          background: 'linear-gradient(135deg, #c31432 0%, #240b36 100%)'
        }}
      >
        <div className="hero-content">
          <h1 className="hero-title fade-in">
            Innovating the <span className="gradient-text">Digital Future</span>
          </h1>
          <p className="hero-subtitle slide-up">
            At Apex Tech Solutions, we transform ideas into powerful digital experiences 
            that drive success and innovation.
          </p>
          <button className="cta-button pulse">
            Explore Our Work
          </button>
        </div>
        <div className="hero-3d">
          <div className="floating-cube"></div>
          <div className="floating-pyramid"></div>
          <div className="floating-sphere"></div>
        </div>
      </section>

      {/* About Section */}
      <section className="about-section">
        <div className="container">
          <div className="about-grid">
            <div className="about-content">
              <h2 className="section-title fade-in">Who We Are</h2>
              <p className="about-text slide-up">
                Apex Tech Solutions is a premier technology company specializing in 
                creating exceptional digital experiences. With years of expertise in 
                web development, mobile applications, and custom software solutions, 
                we help businesses thrive in the digital landscape.
              </p>
              <div className="stats-grid">
                <div className="stat-item fade-in">
                  <h3 className="stat-number">10+</h3>
                  <p className="stat-label">Projects Completed</p>
                </div>
                <div className="stat-item fade-in">
                  <h3 className="stat-number">10+</h3>
                  <p className="stat-label">Happy Clients</p>
                </div>
                <div className="stat-item fade-in">
                  <h3 className="stat-number">1</h3>
                  <p className="stat-label">Years Experience</p>
                </div>
              </div>
            </div>
            <div className="about-visual">
              <div className="rotating-sphere"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Services Section */}
      <section className="services-section">
        <div className="container">
          <h2 className="section-title fade-in">Our Services</h2>
          <p className="section-subtitle slide-up">
            Cutting-edge solutions tailored to your business needs
          </p>
          <div className="services-grid">
            {services.map((service, index) => (
              <div
                key={index}
                ref={addToCardRefs}
                className="service-card card-3d"
                style={{
                  background: 'linear-gradient(135deg, #c31432 0%, #240b36 100%)',
                  border: '1px solid rgba(195, 20, 50, 0.3)'
                }}
              >
                <div className="card-content">
                  <div className="card-icon-wrapper">
                    <div className="card-icon">{service.icon}</div>
                    <div className="icon-glow"></div>
                  </div>
                  <h3 className="card-title">{service.title}</h3>
                  <p className="card-description">{service.description}</p>
                  <ul className="card-features">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="feature-item">
                        <span className="feature-bullet">▶</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <button className="card-button">
                    Learn More →
                  </button>
                </div>
                <div className="card-glow"></div>
                <div className="card-shine"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Footer Section */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-main">
            <div className="footer-brand">
              <div className="footer-logo">
                <img 
                src="/Logo/logo.jpg" 
                alt="Apex Tech Solutions"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'block';
                }}
                />
                <div className="footer-logo-fallback" style={{display: 'none'}}>Apex Tech Solutions
              </div>
              </div>
              <p className="footer-description">
                Transforming ideas into digital reality through innovative technology solutions.
              </p>
              <div className="social-links">
                <a href="#" className="social-link" aria-label="Facebook">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="#" className="social-link" aria-label="Twitter">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63a9.935 9.935 0 002.46-2.548l-.002-.003z"/>
                  </svg>
                </a>
                <a href="#" className="social-link" aria-label="LinkedIn">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a href="#" className="social-link" aria-label="GitHub">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
              </div>
            </div>
            
            <div className="footer-links-grid">
              <div className="footer-column">
                <h4 className="footer-heading">Quick Links</h4>
                <ul className="footer-links">
                  <li><a href="/Homepage" className="footer-link">Home</a></li>
                  <li><a href="#about" className="footer-link">About Us</a></li>
                  <li><a href="/Packages" className="footer-link">Services</a></li>
                  <li><a href="#portfolio" className="footer-link">Portfolio</a></li>
                  <li><a href="#contact" className="footer-link">Contact</a></li>
                </ul>
              </div>
              
              <div className="footer-column">
                <h4 className="footer-heading">Services</h4>
                <ul className="footer-links">
                  <li><a href="#web" className="footer-link">Web Development</a></li>
                  <li><a href="#mobile" className="footer-link">Mobile Apps</a></li>
                  <li><a href="#portfolio" className="footer-link">Web Portfolios</a></li>
                  <li><a href="#solutions" className="footer-link">Tech Solutions</a></li>
                  <li><a href="#consulting" className="footer-link">Consulting</a></li>
                </ul>
              </div>
              
              <div className="footer-column">
                <h4 className="footer-heading">Contact Info</h4>
                <div className="contact-info">
                  <div className="contact-item">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="contact-icon">
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                    </svg>
                    <span>apex.tech.solutions@gmail.com</span>
                  </div>
                  <div className="contact-item">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="contact-icon">
                      <path d="M20 15.5c-1.25 0-2.45-.2-3.57-.57-.35-.11-.74-.03-1.02.24l-2.2 2.2c-2.83-1.44-5.15-3.75-6.59-6.59l2.2-2.21c.28-.26.36-.65.25-1C8.7 6.45 8.5 5.25 8.5 4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.5c0-.55-.45-1-1-1zM12 3v10l3-3h6V3h-9z"/>
                    </svg>
                    <span>+254 (718) 922-875</span>
                  </div>
                  <div className="contact-item">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="contact-icon">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                    </svg>
                    <span>123 Tech Street, Innovation City</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="container">
            <div className="footer-bottom-content">
              <p>&copy; 2025 Apex Tech Solutions. All rights reserved.</p>
              <div className="footer-legal">
                <a href="#privacy" className="legal-link">Privacy Policy</a>
                <a href="#terms" className="legal-link">Terms of Service</a>
                <a href="#cookies" className="legal-link">Cookie Policy</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default AboutUs;