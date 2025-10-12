import React, { useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { useNavigate } from "react-router-dom";

// Modern icons (keep your existing imports)
import { 
  FaGlobe, FaLaptopCode, FaMobileAlt, FaPalette, FaBriefcase, FaPenNib,
  FaChevronDown, FaRocket, FaLightbulb, FaCode, FaPaintBrush, FaServer,
  FaTwitter, FaFacebook, FaInstagram, FaLinkedin, FaGithub, FaDribbble,
  FaEnvelope, FaPhone, FaMapMarkerAlt, FaArrowRight, FaBars, FaTimes
} from "react-icons/fa";

// Enhanced animations (keep your existing animations)
const float = keyframes`
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(5deg); }
`;

const pulse = keyframes`
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.05); opacity: 0.8; }
  100% { transform: scale(1); opacity: 1; }
`;

const glow = keyframes`
  0%, 100% { 
    box-shadow: 0 0 20px rgba(195, 20, 50, 0.3),
                0 0 40px rgba(36, 11, 54, 0.1); 
  }
  50% { 
    box-shadow: 0 0 30px rgba(195, 20, 50, 0.6),
                0 0 60px rgba(36, 11, 54, 0.2); 
  }
`;

const slideUp = keyframes`
  from { 
    opacity: 0;
    transform: translateY(50px) scale(0.95);
  }
  to { 
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`;

const fadeIn = keyframes`
  from { 
    opacity: 0;
    transform: translateY(20px);
  }
  to { 
    opacity: 1;
    transform: translateY(0);
  }
`;

const gradientShift = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const typing = keyframes`
  from { width: 0; }
  to { width: 100%; }
`;

const blink = keyframes`
  0%, 100% { border-color: transparent; }
  50% { border-color: #c31432; }
`;

const morph = keyframes`
  0%, 100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
  50% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
`;

// Modern gradient backgrounds
const modernGradient = css`
  background: linear-gradient(
    135deg,
    #c31432 0%,
    #240b36 25%,
    #8a2387 50%,
    #f27121 75%,
    #e94057 100%
  );
  background-size: 400% 400%;
  animation: ${gradientShift} 15s ease infinite;
`;

const glassMorphism = css`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
`;

// Breakpoints for responsive design
const breakpoints = {
  mobile: '768px',
  tablet: '1024px',
  smallMobile: '480px'
};

// Styled Components
const PageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%);
  color: white;
  font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  overflow-x: hidden;
`;

// Enhanced Navigation - Made fully responsive
const Navbar = styled.nav`
  position: fixed;
  top: 0;
  width: 100%;
  background: rgba(15, 12, 41, 0.95);
  backdrop-filter: blur(20px);
  z-index: 1000;
  padding: 1rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;

  ${props => props.scrolled && css`
    background: rgba(15, 12, 41, 0.98);
    padding: 0.8rem 0;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  `}
`;

const NavContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;

  @media (max-width: ${breakpoints.mobile}) {
    padding: 0 1rem;
  }
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  cursor: pointer;

  @media (max-width: ${breakpoints.smallMobile}) {
    gap: 0.5rem;
  }
`;

const LogoImage = styled.img`
  height: 50px;
  width: 50px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #c31432;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.1);
    border-color: #240b36;
  }

  @media (max-width: ${breakpoints.mobile}) {
    height: 40px;
    width: 40px;
  }
`;

const LogoText = styled.h1`
  font-size: 1.8rem;
  font-weight: 800;
  background: linear-gradient(45deg, #fff, #c31432);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(45deg, #c31432, #240b36);
    transform: scaleX(0);
    transition: transform 0.3s ease;
  }

  &:hover::after {
    transform: scaleX(1);
  }

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 1.4rem;
  }

  @media (max-width: ${breakpoints.smallMobile}) {
    font-size: 1.2rem;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 3rem;
  align-items: center;

  @media (max-width: ${breakpoints.mobile}) {
    display: ${props => props.mobileMenu ? 'flex' : 'none'};
    position: fixed;
    top: 100%;
    left: 0;
    width: 100%;
    background: rgba(15, 12, 41, 0.98);
    backdrop-filter: blur(20px);
    flex-direction: column;
    padding: 2rem;
    gap: 1.5rem;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    border-top: 1px solid rgba(255, 255, 255, 0.1);
  }
`;

const NavLink = styled.a`
  color: white;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
  position: relative;
  cursor: pointer;
  padding: 0.5rem 1rem;
  border-radius: 25px;

  &:hover {
    color: #c31432;
    background: rgba(195, 20, 50, 0.1);
  }

  &::before {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 2px;
    background: linear-gradient(45deg, #c31432, #240b36);
    transition: width 0.3s ease;
  }

  &:hover::before {
    width: 80%;
  }

  @media (max-width: ${breakpoints.mobile}) {
    padding: 1rem;
    width: 100%;
    text-align: center;
    font-size: 1.1rem;
    
    &:hover {
      background: rgba(195, 20, 50, 0.2);
    }
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  transition: all 0.3s ease;

  &:hover {
    color: #c31432;
  }

  @media (max-width: ${breakpoints.mobile}) {
    display: block;
  }
`;

// Enhanced Hero Section with improved mobile responsiveness
const HeroSection = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 0 2rem;
  margin-top: 80px;
  position: relative;
  overflow: hidden;

  @media (max-width: ${breakpoints.mobile}) {
    padding: 0 1rem;
    margin-top: 70px;
    min-height: 90vh;
  }
`;

const HeroBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #c31432 0%, #240b36 100%);
  z-index: -2;
`;

const AnimatedBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: 
    radial-gradient(circle at 20% 80%, rgba(195, 20, 50, 0.4) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(36, 11, 54, 0.4) 0%, transparent 50%),
    radial-gradient(circle at 40% 40%, rgba(138, 35, 135, 0.3) 0%, transparent 50%);
  animation: ${gradientShift} 20s ease infinite;
  z-index: -1;
`;

const FloatingElements = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: -1;

  @media (max-width: ${breakpoints.mobile}) {
    display: none; /* Hide floating elements on mobile for better performance */
  }
`;

const FloatingElement = styled.div`
  position: absolute;
  ${glassMorphism}
  animation: ${float} ${props => props.duration || '20s'} ease-in-out infinite;
  animation-delay: ${props => props.delay || '0s'};
  
  &:nth-child(1) {
    top: 20%;
    left: 10%;
    width: 80px;
    height: 80px;
    animation-duration: 25s;
  }
  
  &:nth-child(2) {
    top: 60%;
    right: 10%;
    width: 120px;
    height: 120px;
    animation-duration: 30s;
  }
  
  &:nth-child(3) {
    bottom: 20%;
    left: 50%;
    width: 60px;
    height: 60px;
    animation-duration: 20s;
  }

  @media (max-width: ${breakpoints.tablet}) {
    &:nth-child(1) {
      width: 60px;
      height: 60px;
    }
    
    &:nth-child(2) {
      width: 80px;
      height: 80px;
    }
    
    &:nth-child(3) {
      width: 40px;
      height: 40px;
    }
  }
`;

const HeroContent = styled.div`
  max-width: 900px;
  z-index: 2;
  animation: ${fadeIn} 1s ease-out;
`;

const HeroTitle = styled.h1`
  font-size: 4.5rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
  line-height: 1.1;
  
  @media (max-width: ${breakpoints.tablet}) {
    font-size: 3.5rem;
  }
  
  @media (max-width: ${breakpoints.mobile}) {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }

  @media (max-width: ${breakpoints.smallMobile}) {
    font-size: 2rem;
  }
`;

const AnimatedGradientText = styled.span`
  ${modernGradient}
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  display: inline-block;
`;

const TypingText = styled.div`
  font-size: 2rem;
  margin-bottom: 2rem;
  color: rgba(255, 255, 255, 0.9);
  overflow: hidden;
  border-right: 3px solid #c31432;
  white-space: nowrap;
  animation: ${typing} 3.5s steps(40, end), ${blink} 0.75s step-end infinite;

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 1.3rem;
    border-right: 2px solid #c31432;
  }

  @media (max-width: ${breakpoints.smallMobile}) {
    font-size: 1.1rem;
    margin-bottom: 1.5rem;
  }
`;

const CtaButtons = styled.div`
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 3rem;

  @media (max-width: ${breakpoints.mobile}) {
    gap: 1rem;
    margin-top: 2rem;
  }
`;

const PrimaryButton = styled.button`
  ${modernGradient}
  color: white;
  border: none;
  padding: 1.2rem 2.5rem;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 20px 40px rgba(195, 20, 50, 0.4);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
    transition: 0.5s;
  }

  &:hover::before {
    left: 100%;
  }

  @media (max-width: ${breakpoints.mobile}) {
    padding: 1rem 2rem;
    font-size: 1rem;
    width: 100%;
    justify-content: center;
  }

  @media (max-width: ${breakpoints.smallMobile}) {
    padding: 0.8rem 1.5rem;
    font-size: 0.9rem;
  }
`;

const SecondaryButton = styled(PrimaryButton)`
  background: transparent;
  border: 2px solid #c31432;
  color: #c31432;

  &:hover {
    background: rgba(195, 20, 50, 0.1);
    box-shadow: 0 10px 30px rgba(195, 20, 50, 0.2);
  }
`;

// Enhanced Services Section with responsive grid
const ServicesSection = styled.section`
  padding: 8rem 0;
  position: relative;

  @media (max-width: ${breakpoints.mobile}) {
    padding: 4rem 0;
  }
`;

const SectionContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;

  @media (max-width: ${breakpoints.mobile}) {
    padding: 0 1rem;
  }
`;

const SectionTitle = styled.h2`
  font-size: 3.5rem;
  text-align: center;
  margin-bottom: 1rem;
  background: linear-gradient(45deg, #fff, #a8a8a8);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  @media (max-width: ${breakpoints.tablet}) {
    font-size: 3rem;
  }

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 2.2rem;
  }

  @media (max-width: ${breakpoints.smallMobile}) {
    font-size: 1.8rem;
  }
`;

const SectionSubtitle = styled.p`
  font-size: 1.3rem;
  text-align: center;
  margin-bottom: 4rem;
  color: rgba(255, 255, 255, 0.8);
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 1.1rem;
    margin-bottom: 3rem;
    padding: 0 1rem;
  }

  @media (max-width: ${breakpoints.smallMobile}) {
    font-size: 1rem;
  }
`;

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2.5rem;
  margin-top: 4rem;

  @media (max-width: ${breakpoints.tablet}) {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
  }

  @media (max-width: ${breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    margin-top: 2rem;
  }
`;

const ServiceCard = styled.div`
  ${glassMorphism}
  border-radius: 25px;
  padding: 3rem 2rem;
  text-align: center;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  position: relative;
  overflow: hidden;
  min-height: 380px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  animation: ${slideUp} 0.6s ease-out ${props => props.delay || '0s'} both;

  &:hover {
    transform: translateY(-20px) scale(1.02);
    box-shadow: 
      0 30px 60px rgba(0, 0, 0, 0.5),
      0 0 100px rgba(195, 20, 50, 0.4);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    ${modernGradient}
  }

  @media (max-width: ${breakpoints.mobile}) {
    padding: 2rem 1.5rem;
    min-height: 320px;
    
    &:hover {
      transform: translateY(-10px) scale(1.01);
    }
  }

  @media (max-width: ${breakpoints.smallMobile}) {
    padding: 1.5rem 1rem;
    min-height: 280px;
  }
`;

const ServiceIconWrapper = styled.div`
  font-size: 4rem;
  margin-bottom: 2rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 100px;
  background: rgba(195, 20, 50, 0.2);
  border-radius: 50%;
  transition: all 0.3s ease;
  animation: ${morph} 6s ease-in-out infinite;

  ${ServiceCard}:hover & {
    background: rgba(195, 20, 50, 0.3);
    transform: scale(1.1);
  }

  svg {
    width: 50px;
    height: 50px;
  }

  @media (max-width: ${breakpoints.mobile}) {
    width: 80px;
    height: 80px;
    font-size: 3rem;
    margin-bottom: 1.5rem;

    svg {
      width: 40px;
      height: 40px;
    }
  }
`;

const ServiceTitle = styled.h3`
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  color: white;
  font-weight: 700;

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }

  @media (max-width: ${breakpoints.smallMobile}) {
    font-size: 1.3rem;
  }
`;

const ServiceDescription = styled.p`
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.7;
  font-size: 1.1rem;
  margin-bottom: 2rem;

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 1rem;
    line-height: 1.6;
    margin-bottom: 1.5rem;
  }
`;

// Stats Section with responsive grid
const StatsSection = styled.section`
  padding: 6rem 0;
  background: rgba(0, 0, 0, 0.2);

  @media (max-width: ${breakpoints.mobile}) {
    padding: 4rem 0;
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 3rem;
  margin-top: 3rem;

  @media (max-width: ${breakpoints.mobile}) {
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
  }

  @media (max-width: ${breakpoints.smallMobile}) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const StatCard = styled.div`
  text-align: center;
  padding: 2rem;
  ${glassMorphism}
  border-radius: 20px;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-10px);
  }

  @media (max-width: ${breakpoints.mobile}) {
    padding: 1.5rem;
    
    &:hover {
      transform: translateY(-5px);
    }
  }
`;

const StatNumber = styled.div`
  font-size: 3.5rem;
  font-weight: 800;
  background: linear-gradient(45deg, #c31432, #240b36);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 1rem;

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 2.5rem;
  }
`;

const StatLabel = styled.div`
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 600;

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 1rem;
  }
`;

// Modern Social Media Icons with responsive layout
const SocialMediaSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const SocialIconsContainer = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

const SocialIcon = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  text-decoration: none;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-5px) scale(1.1);
    background: ${props => {
      switch(props.platform) {
        case 'twitter': return '#1DA1F2';
        case 'facebook': return '#1877F2';
        case 'instagram': return 'linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)';
        case 'linkedin': return '#0077B5';
        case 'github': return '#333';
        case 'dribbble': return '#EA4C89';
        default: return '#c31432';
      }
    }};
    box-shadow: 0 10px 20px rgba(195, 20, 50, 0.3);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
    transition: 0.5s;
  }

  &:hover::before {
    left: 100%;
  }

  svg {
    width: 20px;
    height: 20px;
    z-index: 1;
  }

  @media (max-width: ${breakpoints.mobile}) {
    width: 45px;
    height: 45px;
    
    svg {
      width: 18px;
      height: 18px;
    }
  }
`;

// Enhanced Footer with responsive grid
const Footer = styled.footer`
  background: rgba(0, 0, 0, 0.4);
  padding: 4rem 0 2rem;
  margin-top: 4rem;

  @media (max-width: ${breakpoints.mobile}) {
    padding: 3rem 0 2rem;
    margin-top: 2rem;
  }
`;

const FooterContainer = styled(SectionContainer)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 4rem;
  margin-bottom: 3rem;

  @media (max-width: ${breakpoints.mobile}) {
    gap: 3rem;
    grid-template-columns: 1fr;
  }
`;

const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  @media (max-width: ${breakpoints.mobile}) {
    gap: 1rem;
    text-align: center;
  }
`;

const FooterLogo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;

  @media (max-width: ${breakpoints.mobile}) {
    justify-content: center;
    flex-direction: column;
    text-align: center;
  }
`;

const FooterLogoImage = styled.img`
  height: 60px;
  width: 60px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #c31432;

  @media (max-width: ${breakpoints.mobile}) {
    height: 50px;
    width: 50px;
  }
`;

const FooterTitle = styled.h4`
  font-size: 1.3rem;
  margin-bottom: 1rem;
  color: white;
  font-weight: 700;

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 1.1rem;
  }
`;

const FooterText = styled.p`
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.6;
  font-size: 1rem;

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 0.9rem;
  }
`;

const FooterLink = styled.a`
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  transition: all 0.3s ease;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    color: #c31432;
    transform: translateX(5px);
  }

  @media (max-width: ${breakpoints.mobile}) {
    justify-content: center;
    font-size: 0.9rem;
  }
`;

const FooterBottom = styled.div`
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 2rem;
  text-align: center;
`;

const Copyright = styled.p`
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.9rem;

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 0.8rem;
    padding: 0 1rem;
  }
`;

// Scroll to Top Button with responsive positioning
const ScrollToTop = styled.button`
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 50px;
  height: 50px;
  ${glassMorphism}
  border: none;
  border-radius: 50%;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  transition: all 0.3s ease;
  z-index: 1000;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 25px rgba(195, 20, 50, 0.3);
  }

  @media (max-width: ${breakpoints.mobile}) {
    bottom: 20px;
    right: 20px;
    width: 45px;
    height: 45px;
    font-size: 1rem;
  }
`;

// Overlay for mobile menu
const MobileOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
  z-index: 999;
  display: ${props => props.show ? 'block' : 'none'};
`;

// React Component
const Homepage = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > 50);
      setShowScrollTop(offset > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigate = useNavigate();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleMobileMenu = () => {
    setMobileMenu(!mobileMenu);
  };

  const handleNavClick = (path) => {
    navigate(path);
    setMobileMenu(false);
  };

  const services = [
    {
      title: "Website Development",
      description: "Custom websites built with modern technologies that drive results and engage your audience effectively.",
      icon: <FaGlobe />
    },
    {
      title: "Web Applications",
      description: "Scalable web applications with cutting-edge technologies and seamless user experiences.",
      icon: <FaLaptopCode />
    },
    {
      title: "Mobile Apps",
      description: "Cross-platform mobile applications for iOS and Android with native performance.",
      icon: <FaMobileAlt />
    },
    {
      title: "UI/UX Design",
      description: "Stunning user interfaces and experiences that captivate users and drive engagement.",
      icon: <FaPalette />
    },
    {
      title: "Digital Strategy",
      description: "Complete digital transformation strategies to grow your business online.",
      icon: <FaBriefcase />
    },
    {
      title: "Brand Identity",
      description: "Comprehensive branding solutions including logos, style guides, and visual systems.",
      icon: <FaPenNib />
    }
  ];

  const stats = [
    { number: "10+", label: "Projects Completed" },
    { number: "10+", label: "Happy Clients" },
    { number: "1+", label: "Years Experience" },
    { number: "24/7", label: "Support Available" }
  ];

  const socialMedia = [
    { platform: 'twitter', icon: <FaTwitter />, url: 'https://twitter.com' },
    { platform: 'facebook', icon: <FaFacebook />, url: 'https://facebook.com' },
    { platform: 'instagram', icon: <FaInstagram />, url: 'https://instagram.com' },
    { platform: 'linkedin', icon: <FaLinkedin />, url: 'https://linkedin.com' },
    { platform: 'github', icon: <FaGithub />, url: 'https://github.com' },
    { platform: 'dribbble', icon: <FaDribbble />, url: 'https://dribbble.com' }
  ];

  return (
    <PageContainer>
      {/* Mobile Menu Overlay */}
      <MobileOverlay show={mobileMenu} onClick={() => setMobileMenu(false)} />
      
      {/* Navigation Bar */}
      <Navbar scrolled={scrolled}>
        <NavContainer>
          <LogoContainer onClick={() => navigate('/')}>
            <LogoImage src="/Logo/Logo.jpg" alt="Apex Tech Solutions" />
            <LogoText>Apex Tech Solutions</LogoText>
          </LogoContainer>
          
          <NavLinks mobileMenu={mobileMenu}>
            <NavLink onClick={() => handleNavClick('/')}>Home</NavLink>
            <NavLink onClick={() => handleNavClick('/Packages')}>Services</NavLink>
            <NavLink onClick={() => handleNavClick('/Aboutus')}>About Us</NavLink>
            <NavLink onClick={() => handleNavClick('/contact')}>Contact</NavLink>
          </NavLinks>

          <MobileMenuButton onClick={toggleMobileMenu}>
            {mobileMenu ? <FaTimes /> : <FaBars />}
          </MobileMenuButton>
        </NavContainer>
      </Navbar>

      {/* Hero Section */}
      <HeroSection id="home">
        <HeroBackground />
        <AnimatedBackground />
        <FloatingElements>
          <FloatingElement />
          <FloatingElement />
          <FloatingElement />
        </FloatingElements>
        
        <HeroContent>
          <HeroTitle>
            Transform Your <AnimatedGradientText>Digital Vision</AnimatedGradientText> Into Reality
          </HeroTitle>
          <TypingText>
            Building the future, one pixel at a time
          </TypingText>
          <CtaButtons>
            <PrimaryButton onClick={() => handleNavClick('/Packages')}>
              Explore Services <FaArrowRight />
            </PrimaryButton>
            <SecondaryButton onClick={() => handleNavClick('/contact')}>
              Get In Touch
            </SecondaryButton>
          </CtaButtons>
        </HeroContent>
      </HeroSection>

      {/* Services Section */}
      <ServicesSection id="services">
        <SectionContainer>
          <SectionTitle>Our Expertise</SectionTitle>
          <SectionSubtitle>
            We deliver cutting-edge digital solutions that drive growth and innovation for your business
          </SectionSubtitle>
          <ServicesGrid>
            {services.map((service, index) => (
              <ServiceCard key={index} delay={`${index * 0.1}s`}>
                <div>
                  <ServiceIconWrapper>
                    {service.icon}
                  </ServiceIconWrapper>
                  <ServiceTitle>{service.title}</ServiceTitle>
                  <ServiceDescription>{service.description}</ServiceDescription>
                </div>
                <PrimaryButton style={{ padding: '0.8rem 1.5rem', fontSize: '1rem' }}>
                  Learn More <FaArrowRight />
                </PrimaryButton>
              </ServiceCard>
            ))}
          </ServicesGrid>
        </SectionContainer>
      </ServicesSection>

      {/* Stats Section */}
      <StatsSection id="stats">
        <SectionContainer>
          <SectionTitle>Our Impact</SectionTitle>
          <SectionSubtitle>
            Numbers that speak for our commitment to excellence
          </SectionSubtitle>
          <StatsGrid>
            {stats.map((stat, index) => (
              <StatCard key={index}>
                <StatNumber>{stat.number}</StatNumber>
                <StatLabel>{stat.label}</StatLabel>
              </StatCard>
            ))}
          </StatsGrid>
        </SectionContainer>
      </StatsSection>

      {/* Footer */}
      <Footer id="contact">
        <FooterContainer>
          <FooterSection>
            <FooterLogo>
              <FooterLogoImage src="/Logo/Logo.jpg" alt="Apex Tech Solutions" />
              <FooterTitle>Apex Tech Solutions</FooterTitle>
            </FooterLogo>
            <FooterText>
              Transforming ideas into exceptional digital experiences through innovation, 
              creativity, and cutting-edge technology.
            </FooterText>
            <SocialMediaSection>
              <FooterTitle>Follow Us</FooterTitle>
              <SocialIconsContainer>
                {socialMedia.map((social, index) => (
                  <SocialIcon
                    key={index}
                    href={social.url}
                    platform={social.platform}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {social.icon}
                  </SocialIcon>
                ))}
              </SocialIconsContainer>
            </SocialMediaSection>
          </FooterSection>
          
          <FooterSection>
            <FooterTitle>Quick Links</FooterTitle>
            <FooterLink onClick={() => handleNavClick('/')}>
              <FaArrowRight size={12} /> Home
            </FooterLink>
            <FooterLink onClick={() => handleNavClick('/Packages')}>
              <FaArrowRight size={12} /> Services
            </FooterLink>
            <FooterLink onClick={() => handleNavClick('/Aboutus')}>
              <FaArrowRight size={12} /> About Us
            </FooterLink>
          </FooterSection>
          
          <FooterSection>
            <FooterTitle>Contact Info</FooterTitle>
            <FooterLink href="mailto:apex.tech.solutions888@gmail.com">
              <FaEnvelope /> apex.tech.solutions888@gmail.com
            </FooterLink>
            <FooterLink href="tel:+254718922875">
              <FaPhone /> +254 (718) 922-875
            </FooterLink>
            <FooterLink>
              <FaMapMarkerAlt /> 123 Innovation Drive, Tech City
            </FooterLink>
          </FooterSection>
        </FooterContainer>
        
        <FooterBottom>
          <Copyright>
            &copy; 2025 Apex Tech Solutions. All rights reserved. | Built with innovation and passion
          </Copyright>
        </FooterBottom>
      </Footer>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <ScrollToTop onClick={scrollToTop}>
          <FaChevronDown style={{ transform: 'rotate(180deg)' }} />
        </ScrollToTop>
      )}
    </PageContainer>
  );
};

export default Homepage;