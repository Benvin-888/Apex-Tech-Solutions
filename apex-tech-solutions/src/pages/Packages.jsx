import { useEffect, useRef, useState } from 'react';
import '../styles/Packages.css';
import { useNavigate } from "react-router-dom";


function Packages() {
  const canvasRef = useRef(null);
  const [activeTab, setActiveTab] = useState('all');
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
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
      
      {/* Enhanced Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-logo">
            <img src="/Logo/Logo.jpg" alt="Apex Tech Solutions" />
            <span>Apex Tech</span>
          </div>
          <ul className="nav-menu">
            <li className="nav-item">
              <a href="/Homepage" className="nav-link">Home</a>
            </li>
            <li className="nav-item">
              <a href="/AboutUs" className="nav-link">About</a>
            </li>
            <li className="nav-item">
              <a href="/packages" className="nav-link active">Packages</a>
            </li>
            <li className="nav-item">
              <a href="/portfolio" className="nav-link">Portfolio</a>
            </li>
            <li className="nav-item">
              <a href="/contact" className="nav-link">Contact</a>
            </li>
          </ul>
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
              <span className="stat-number">150+</span>
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
              <button className="cta-button large pulse">
                Get Custom Quote
              </button>
              <button className="cta-button secondary large">
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
            <div className="footer-section">
              <div className="footer-logo">
                <img src={`${process.env.PUBLIC_URL}/Logo/logo.jpg`} alt="Apex Tech Solutions" />
                <span>Apex Tech Solutions</span>
              </div>
              <p className="footer-description">
                Transforming ideas into digital reality through innovative technology solutions 
                and premium development services.
              </p>
              <div className="social-links">
                <a href="#" className="social-link" aria-label="Facebook">📘</a>
                <a href="#" className="social-link" aria-label="Twitter">🐦</a>
                <a href="#" className="social-link" aria-label="Instagram">📷</a>
                <a href="#" className="social-link" aria-label="LinkedIn">💼</a>
              </div>
            </div>
            
            <div className="footer-section">
              <h4 className="footer-heading">Services</h4>
              <ul className="footer-links">
                <li><a href="#web">Website Development</a></li>
                <li><a href="#webapp">Web Applications</a></li>
                <li><a href="#portfolio">Portfolio Sites</a></li>
                <li><a href="#mobile">Mobile Apps</a></li>
              </ul>
            </div>
            
            <div className="footer-section">
              <h4 className="footer-heading">Packages</h4>
              <ul className="footer-links">
                <li><a href="#starter">Starter Packages</a></li>
                <li><a href="#business">Business Packages</a></li>
                <li><a href="#enterprise">Enterprise Solutions</a></li>
                <li><a href="#custom">Custom Development</a></li>
              </ul>
            </div>
            
            <div className="footer-section">
              <h4 className="footer-heading">Contact Info</h4>
              <div className="contact-info">
                <p>📧 apex.tech.solutions888@gmail.com</p>
                <p>📞 +254 (718) 922-875</p>
                <p>📍 123 Tech Street, Innovation City</p>
              </div>
            </div>
          </div>
          
          <div className="footer-bottom">
            <p>&copy; 2025 Apex Tech Solutions. All rights reserved.</p>
            <div className="footer-links">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
              <a href="#">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Packages;