import { useEffect, useRef, useState } from 'react';
import '../styles/Packages.css';
import { Link, NavLink } from 'react-router-dom';


function Packages() {
  const canvasRef = useRef(null);
  const [activeTab, setActiveTab] = useState('all');
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const cardRefs = useRef([]);

  const packages = {
    web: [
      {
        id: 1,
        name: "Starter Website",
        price: "$999",
        originalPrice: "$1299",
        description: "Perfect for small businesses and personal brands",
        features: [
          "5 Custom Pages",
          "Mobile Responsive Design",
          "Basic SEO Optimization",
          "Contact Form",
          "1 Month Support",
          "Google Analytics Setup"
        ],
        popular: false,
        type: "web",
        deliveryTime: "2-3 weeks",
        revisions: "2 rounds",
        gradient: "linear-gradient(135deg, #c31432 0%, #240b36 100%)"
      },
      {
        id: 2,
        name: "Business Pro",
        price: "$2499",
        originalPrice: "$2999",
        description: "Complete web solution for growing businesses",
        features: [
          "10+ Custom Pages",
          "CMS Integration",
          "Advanced SEO",
          "E-commerce Ready",
          "3 Months Support",
          "Performance Optimization",
          "Security Setup",
          "Social Media Integration"
        ],
        popular: true,
        type: "web",
        deliveryTime: "4-5 weeks",
        revisions: "3 rounds",
        gradient: "linear-gradient(135deg, #c31432 0%, #240b36 80%)"
      }
    ],
    webapp: [
      {
        id: 3,
        name: "Basic Web App",
        price: "$4999",
        originalPrice: "$5999",
        description: "Custom web applications for specific business needs",
        features: [
          "React/Node.js Stack",
          "User Authentication",
          "Database Integration",
          "RESTful APIs",
          "6 Months Support",
          "Basic Dashboard",
          "Responsive Design"
        ],
        popular: false,
        type: "webapp",
        deliveryTime: "6-8 weeks",
        revisions: "3 rounds",
        gradient: "linear-gradient(135deg, #240b36 0%, #c31432 100%)"
      },
      {
        id: 4,
        name: "Enterprise Web App",
        price: "$8999",
        originalPrice: "$10999",
        description: "Scalable web applications for large organizations",
        features: [
          "Microservices Architecture",
          "Real-time Features",
          "Advanced Security",
          "Cloud Deployment",
          "1 Year Support",
          "Advanced Analytics",
          "Multi-tenant Setup",
          "API Documentation",
          "CI/CD Pipeline"
        ],
        popular: true,
        type: "webapp",
        deliveryTime: "10-12 weeks",
        revisions: "4 rounds",
        gradient: "linear-gradient(135deg, #c31432 0%, #240b36 50%, #c31432 100%)"
      }
    ],
    portfolio: [
      {
        id: 5,
        name: "Portfolio Basic",
        price: "$799",
        originalPrice: "$999",
        description: "Showcase your work with a stunning portfolio",
        features: [
          "3 Portfolio Sections",
          "Gallery Layout",
          "Contact Form",
          "Mobile Optimized",
          "Social Links",
          "1 Month Support"
        ],
        popular: false,
        type: "portfolio",
        deliveryTime: "1-2 weeks",
        revisions: "2 rounds",
        gradient: "linear-gradient(135deg, #240b36 0%, #c31432 100%)"
      },
      {
        id: 6,
        name: "Premium Portfolio",
        price: "$1899",
        originalPrice: "$2299",
        description: "Advanced portfolio with interactive elements",
        features: [
          "Unlimited Sections",
          "3D Animations",
          "Video Integration",
          "Blog Integration",
          "Custom Domain",
          "3 Months Support",
          "SEO Optimization",
          "Analytics Dashboard"
        ],
        popular: true,
        type: "portfolio",
        deliveryTime: "3-4 weeks",
        revisions: "3 rounds",
        gradient: "linear-gradient(135deg, #c31432 0%, #240b36 70%)"
      }
    ],
    mobile: [
      {
        id: 7,
        name: "Mobile App Basic",
        price: "$6999",
        originalPrice: "$8499",
        description: "Cross-platform mobile application",
        features: [
          "iOS & Android",
          "React Native",
          "Basic Features",
          "App Store Deployment",
          "6 Months Support",
          "Push Notifications",
          "Offline Capability"
        ],
        popular: false,
        type: "mobile",
        deliveryTime: "8-10 weeks",
        revisions: "3 rounds",
        gradient: "linear-gradient(135deg, #240b36 0%, #c31432 100%)"
      },
      {
        id: 8,
        name: "Enterprise Mobile",
        price: "$14999",
        originalPrice: "$17999",
        description: "Feature-rich mobile applications",
        features: [
          "Native iOS & Android",
          "Advanced Features",
          "Backend Integration",
          "1 Year Support",
          "Real-time Updates",
          "Advanced Security",
          "Payment Integration",
          "Analytics & Tracking"
        ],
        popular: true,
        type: "mobile",
        deliveryTime: "12-16 weeks",
        revisions: "4 rounds",
        gradient: "linear-gradient(135deg, #c31432 0%, #240b36 60%)"
      }
    ]
  };

  // Enhanced particle system with new colors
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class Particle {
      constructor() {
        this.reset();
        this.vx = (Math.random() - 0.5) * 2;
        this.vy = (Math.random() - 0.5) * 2;
      }
      
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.z = Math.random() * 1500;
        this.size = Math.random() * 3 + 1;
        this.speed = Math.random() * 0.8 + 0.2;
        this.color = Math.random() > 0.5 ? '#c31432' : '#240b36';
      }
      
      update() {
        this.z -= this.speed;
        this.x += this.vx;
        this.y += this.vy;
        
        if (this.z <= 0 || this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
          this.reset();
          this.z = 1500;
        }
      }
      
      draw() {
        const scale = 1500 / (1500 + this.z);
        const x2d = this.x * scale;
        const y2d = this.y * scale;
        const size2d = this.size * scale;
        
        const alpha = scale * 0.8;
        ctx.fillStyle = this.color === '#c31432' 
          ? `rgba(195, 20, 50, ${alpha})`
          : `rgba(36, 11, 54, ${alpha})`;
        ctx.beginPath();
        ctx.arc(x2d, y2d, size2d, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const particles = Array(150).fill().map(() => new Particle());

    function animate() {
      ctx.fillStyle = 'rgba(10, 15, 25, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });
      
      requestAnimationFrame(animate);
    }
    
    animate();

    // Enhanced intersection observer with staggered animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('animate-in');
          }, index * 150);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in, .slide-up, .package-card, .tab-button').forEach(el => {
      observer.observe(el);
    });

    // Enhanced 3D Card effects
    // Store a snapshot of the current cardRefs for cleanup
    const cardsSnapshot = [...cardRefs.current];

    // Store handlers for cleanup
    const handlers = new Map();

    cardsSnapshot.forEach(card => {
      if (card) {
        const handleMouseMove = (e) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          
          const rotateY = (x - centerX) / 25;
          const rotateX = (centerY - y) / 25;
          
          card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`;
          
          // Add glow effect
          const glow = card.querySelector('.card-glow');
          if (glow) {
            glow.style.opacity = '0.3';
            glow.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(195, 20, 50, 0.4), transparent)`;
          }
        };
        
        const handleMouseLeave = () => {
          card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
          const glow = card.querySelector('.card-glow');
          if (glow) {
            glow.style.opacity = '0';
          }
        };

        handlers.set(card, { handleMouseMove, handleMouseLeave });
        
        card.addEventListener('mousemove', handleMouseMove);
        card.addEventListener('mouseleave', handleMouseLeave);
      }
    });

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cardsSnapshot.forEach(card => {
        if (card && handlers.has(card)) {
          const { handleMouseMove, handleMouseLeave } = handlers.get(card);
          card.removeEventListener('mousemove', handleMouseMove);
          card.removeEventListener('mouseleave', handleMouseLeave);
        }
      });
    };
  }, []);

  const addToCardRefs = (el) => {
    if (el && !cardRefs.current.includes(el)) {
      cardRefs.current.push(el);
    }
  };

  const allPackages = Object.values(packages).flat();

  const filteredPackages = activeTab === 'all' 
    ? allPackages 
    : packages[activeTab] || [];

  const openModal = (pkg) => {
    setSelectedPackage(pkg);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPackage(null);
    document.body.style.overflow = 'auto';
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handlePurchase = (pkg) => {
    alert(`Thank you for choosing ${pkg.name}! Our team will contact you shortly.`);
    closeModal();
  };

  const handleScheduleCall = () => {
    alert('Scheduling feature coming soon!');
  };

  return (
    <div className="packages-page">
      <canvas ref={canvasRef} className="background-canvas" />
      
      {/* Enhanced Responsive Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-logo">
            <img src="/Logo/Logo.jpg" alt="Apex Tech Solutions" />
            <span style={{ color: 'var(--accent-color)' }}>Apex Tech Solutions</span>
          </div>
          
          <div className={`nav-menu ${isMobileMenuOpen ? 'active' : ''}`}>
            <div className="nav-links">
              <NavLink to="/Homepage" className="nav-link">Home</NavLink>
              <NavLink to="/AboutUs" className="nav-link">About</NavLink>
              <NavLink to="/packages" className="nav-link" activeclassname="active">Packages</NavLink>
              <a href="#contact" className="nav-link">Contact</a>
            </div>
          </div>

          <button 
            className={`mobile-menu-toggle ${isMobileMenuOpen ? 'active' : ''}`}
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      {/* Enhanced Hero Section */}
      <section className="packages-hero">
        <div className="hero-content">
          <div className="hero-badge">Premium Services</div>
          <h1 className="hero-title fade-in">
            Transform Your <span className="gradient-text">Digital Presence</span>
          </h1>
          <p className="hero-subtitle slide-up">
            Professional packages tailored to elevate your business. 
            From stunning websites to powerful applications.
          </p>
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-number">10+</span>
              <span className="stat-label">Projects Completed</span>
            </div>
            <div className="stat">
              <span className="stat-number">98%</span>
              <span className="stat-label">Client Satisfaction</span>
            </div>
            <div className="stat">
              <span className="stat-number">24/7</span>
              <span className="stat-label">Support</span>
            </div>
          </div>
        </div>
        <div className="floating-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
        </div>
      </section>

      {/* Enhanced Package Tabs */}
      <section className="package-tabs-section">
        <div className="container">
          <div className="section-header">
            <h2>Choose Your Package</h2>
            <p>Select from our carefully crafted service packages</p>
          </div>
          <div className="tabs-container">
            {['all', 'web', 'webapp', 'portfolio', 'mobile'].map(tab => (
              <button 
                key={tab}
                className={`tab-button ${activeTab === tab ? 'active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab === 'all' ? 'All Packages' : 
                 tab === 'web' ? 'Websites' :
                 tab === 'webapp' ? 'Web Apps' :
                 tab === 'portfolio' ? 'Portfolios' : 'Mobile Apps'}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Packages Grid */}
      <section className="packages-grid-section">
        <div className="container">
          <div className="packages-grid">
            {filteredPackages.map((pkg, index) => (
              <div
                key={pkg.id}
                ref={addToCardRefs}
                className={`package-card ${pkg.popular ? 'popular' : ''}`}
                style={{ '--card-gradient': pkg.gradient }}
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                {pkg.popular && <div className="popular-badge">🔥 Most Popular</div>}
                
                <div className="card-header">
                  <div className="package-type">{pkg.type.toUpperCase()}</div>
                  <h3 className="package-name">{pkg.name}</h3>
                  <div className="price-section">
                    <span className="current-price">{pkg.price}</span>
                    {pkg.originalPrice && (
                      <span className="original-price">{pkg.originalPrice}</span>
                    )}
                  </div>
                  <p className="package-description">{pkg.description}</p>
                </div>

                <div className="card-features">
                  <div className="features-header">
                    <span>What's Included</span>
                  </div>
                  <ul className="features-list">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} className="feature-item">
                        <span className="check-icon">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="card-meta">
                  <div className="meta-item">
                    <span className="meta-label">Delivery</span>
                    <span className="meta-value">{pkg.deliveryTime}</span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-label">Revisions</span>
                    <span className="meta-value">{pkg.revisions}</span>
                  </div>
                </div>

                <div className="card-actions">
                  <button 
                    className="cta-button primary"
                    onClick={() => openModal(pkg)}
                  >
                    Get Started
                  </button>
                  <button 
                    className="cta-button secondary"
                    onClick={() => openModal(pkg)}
                  >
                    Learn More
                  </button>
                </div>

                <div className="card-glow"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <div className="cta-badge">Limited Time Offer</div>
            <h2 className="cta-title fade-in">
              Ready to <span className="gradient-text">Start Your Project?</span>
            </h2>
            <p className="cta-subtitle slide-up">
              Get 15% off your first project when you sign up this month. 
              Let's build something amazing together!
            </p>
            <div className="cta-actions">
              <button className="cta-button large pulse" onClick={handleScheduleCall}>
                Get Custom Quote
              </button>
              <button className="cta-button secondary large" onClick={handleScheduleCall}>
                Schedule Call
              </button>
            </div>
            <div className="cta-features">
              <div className="feature">
                <span className="feature-icon">🚀</span>
                <span>Fast Delivery</span>
              </div>
              <div className="feature">
                <span className="feature-icon">💎</span>
                <span>Premium Quality</span>
              </div>
              <div className="feature">
                <span className="feature-icon">🛡️</span>
                <span>24/7 Support</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Modal */}
      {selectedPackage && (
        <div className={`modal-overlay ${isModalOpen ? 'active' : ''}`} onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>×</button>
            
            <div className="modal-header">
              <div className="modal-badge">{selectedPackage.type.toUpperCase()}</div>
              <h2>{selectedPackage.name}</h2>
              <div className="modal-price">
                <span className="current-price">{selectedPackage.price}</span>
                {selectedPackage.originalPrice && (
                  <span className="original-price">{selectedPackage.originalPrice}</span>
                )}
              </div>
            </div>

            <div className="modal-body">
              <p className="modal-description">{selectedPackage.description}</p>
              
              <div className="modal-features">
                <h4>Package Includes:</h4>
                <ul>
                  {selectedPackage.features.map((feature, idx) => (
                    <li key={idx}>
                      <span className="feature-check">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="modal-meta">
                <div className="meta-card">
                  <span className="meta-icon">⏱️</span>
                  <div>
                    <div className="meta-title">Delivery Time</div>
                    <div className="meta-value">{selectedPackage.deliveryTime}</div>
                  </div>
                </div>
                <div className="meta-card">
                  <span className="meta-icon">🔄</span>
                  <div>
                    <div className="meta-title">Revisions</div>
                    <div className="meta-value">{selectedPackage.revisions}</div>
                  </div>
                </div>
                <div className="meta-card">
                  <span className="meta-icon">🛡️</span>
                  <div>
                    <div className="meta-title">Support</div>
                    <div className="meta-value">Included</div>
                  </div>
                </div>
              </div>

              <div className="modal-actions">
                <button 
                  className="cta-button primary large"
                  onClick={() => handlePurchase(selectedPackage)}
                >
                  Purchase Now
                </button>
                <button 
                  className="cta-button secondary"
                  onClick={handleScheduleCall}
                >
                  Schedule Call
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-main">
              <div className="footer-brand">
                <div className="footer-logo">
                  <img src="/Logo/Logo.jpg" alt="Apex Tech Solutions" />
                  <span>Apex Tech Solutions</span>
                </div>
                <p className="footer-description">
                  Transforming ideas into digital reality through innovative technology solutions 
                  and premium development services.
                </p>
                <div className="social-links">
                  <a href="#" className="social-link" aria-label="Facebook">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                  <a href="#" className="social-link" aria-label="Twitter">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                  </a>
                  <a href="#" className="social-link" aria-label="Instagram">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                  <a href="#" className="social-link" aria-label="LinkedIn">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                </div>
              </div>

              <div className="footer-links-grid">
                <div className="footer-column">
                  <h4 className="footer-heading">Services</h4>
                  <ul className="footer-links">
                    <li><a href="#web">Website Development</a></li>
                    <li><a href="#webapp">Web Applications</a></li>
                    <li><a href="#portfolio">Portfolio Sites</a></li>
                    <li><a href="#mobile">Mobile Apps</a></li>
                    <li><a href="#ecommerce">E-commerce Solutions</a></li>
                  </ul>
                </div>
                
                <div className="footer-column">
                  <h4 className="footer-heading">Packages</h4>
                  <ul className="footer-links">
                    <li><a href="#starter">Starter Packages</a></li>
                    <li><a href="#business">Business Packages</a></li>
                    <li><a href="#enterprise">Enterprise Solutions</a></li>
                    <li><a href="#custom">Custom Development</a></li>
                    <li><a href="#support">Support & Maintenance</a></li>
                  </ul>
                </div>

                <div className="footer-column">
                  <h4 className="footer-heading">Contact Info</h4>
                  <div className="contact-info">
                    <div className="contact-item">
                      <div className="contact-icon">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                        </svg>
                      </div>
                      <span>apex.tech.solutions888@gmail.com</span>
                    </div>
                    <div className="contact-item">
                      <div className="contact-icon">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                        </svg>
                      </div>
                      <span>+254 (718) 922-875</span>
                    </div>
                    <div className="contact-item">
                      <div className="contact-icon">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                        </svg>
                      </div>
                      <span>Nairobi, Kenya</span>
                    </div>
                    <div className="contact-item">
                      <div className="contact-icon">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
                        </svg>
                      </div>
                      <span>Mon - Fri: 9:00 AM - 6:00 PM</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="footer-bottom">
              <div className="footer-bottom-content">
                <p>&copy; 2025 Apex Tech Solutions. All rights reserved.</p>
                <div className="footer-legal">
                  <a href="#">Privacy Policy</a>
                  <a href="#">Terms of Service</a>
                  <a href="#">Cookie Policy</a>
                  <a href="#">Sitemap</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Packages;