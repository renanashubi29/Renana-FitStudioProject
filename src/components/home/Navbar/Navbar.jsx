import React, { useContext, useState } from 'react';
import './Navbar.css';
import UserIcon from '../UserIcon/UserIcon.jsx';
import { ShopContext } from '../../../ShopContext.js';
import { useNavigate } from 'react-router';
import { JoinUsModal } from '../../JoinUsModal/JoinUsModal.jsx';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

const Navbar = () => {

  const navigate = useNavigate();
 const { setUser,user } = useContext(ShopContext);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const handleLogout = () => {
  localStorage.removeItem('token'); // או איך שאת שומרת את ה-Auth
  setUser(null); // עדכון ה-Context
  navigate('/'); // ניווט לדף הבית
};

  // פונקציית עזר לפתיחה
  const handleOpenModal = () => {
    // נפתח את המודל רק אם אין משתמש מחובר
    if (!user) {
      setIsAuthModalOpen(true);
    }
  };
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: 'HOME', href: '#', active: false },
    { name: 'ABOUT US', href: '#', active: false },
    { name: 'CLASSES', href: '#', active: false },
    { name: 'SERVICES', href: '#', active: false },
    { name: 'OUR TEAM', href: '#', active: false },
    { name: 'PAGES', href: '#', active: false },
    { name: 'CONTACT', href: '#', active: false },
  ];

  return (
   <header className="main-header">
  
  <div className="header-container">
    
    {/* Logo */}
    <div className="logo">
      <span className="logo-white">GYM</span>
      <span className="logo-orange">LIFE</span>
    </div>

    
    {/* Navigation */}
    <nav className="desktop-nav">
      {navLinks.map((link) => (
        <a key={link.name} href={link.href} className={link.active ? 'nav-link active' : 'nav-link'}>
          {link.name}
        </a>
      ))}
    </nav>

   <div className="right-section">
   <div className="schedule-icon-wrapper" onClick={() => navigate('/schedule')} title="Go to Schedule">
    <CalendarMonthIcon className="schedule-icon" />
  </div>
  {user ? (
  <div className="user-info-wrapper">
    <UserIcon name={user.name} />
    <button className="logout-btn" onClick={handleLogout}>Logout</button>
  </div>
) : (
  <button className="gym-button" onClick={handleOpenModal}>JOIN US</button>
)}
 </div>
 </div>
 <JoinUsModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />
</header>
  );
};

export default Navbar;