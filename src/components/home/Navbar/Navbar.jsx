
import React, { useContext, useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import './Navbar.css';

// Icons
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PersonIcon from '@mui/icons-material/Person';

// Components & Context
import { ShopContext } from '../../../ShopContext.js';
import { JoinUsModal } from '../../JoinUsModal/JoinUsModal.jsx';
import { AdminActions } from '../../admin/AdminActions/AdminActions.jsx';
import UserIcon from '../UserIcon/UserIcon.jsx';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, setUser } = useContext(ShopContext);
  
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // בדיקה האם אנחנו בדף הבית (כדי להחליט אם להציג לינקים)
  const isHomePage = location.pathname === '/';

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/');
  };

  const handleOpenModal = () => {
    if (!user) {
      setIsAuthModalOpen(true);
    }
  };

  const navLinks = [
    { name: 'HOME', href: '#', active: isHomePage },
    { name: 'ABOUT US', href: '#about' },
    { name: 'CLASSES', href: '#classes' },
    { name: 'SERVICES', href: '#services' },
    { name: 'OUR TEAM', href: '#team' },
    { name: 'PRICING', href: '#Pricing' },
    { name: 'CONTACT', href: '#contact' },
  ];

  return (
    <header className="main-header">
      <div className="header-container">
        
        {/* לוגו - תמיד מוביל לדף הבית */}
        <div className="logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
          <span className="logo-white">GYM</span>
          <span className="logo-orange">LIFE</span>
        </div>

        {/* תפריט ניווט - מוצג רק בדף הבית */}
        {isHomePage && (
          <nav className="desktop-nav">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="nav-link">
                {link.name}
              </a>
            ))}
          </nav>
        )}

        {/* חלק ימני - פעולות מנהל, לוח שנה ופרופיל */}
        <div className="right-section">
          
          {/* כפתורי מנהל - יופיעו רק אם המשתמש הוא אדמין */}
          {user && user.role === 'admin' && <AdminActions />}

          {/* אייקון לוח שנה - לא מופיע אם אנחנו כבר בדף הלו"ז */}
          {location.pathname !== '/schedule' && (
            <div className="schedule-icon-wrapper" onClick={() => navigate('/schedule')} title="Go to Schedule">
              <CalendarMonthIcon className="schedule-icon" />
            </div>
          )}

          {/* אזור משתמש (מחובר/אורח) */}
          {user ? (
            <div className="user-info-wrapper">
              <UserIcon name={user.name} />
              <button className="logout-btn" onClick={handleLogout}>Logout</button>
            </div>
          ) : (
            <button className="gym-button" onClick={handleOpenModal}>
              JOIN US
            </button>
          )}
        </div>
      </div>

      {/* מודל התחברות */}
      <JoinUsModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />
    </header>
  );
};

export default Navbar;