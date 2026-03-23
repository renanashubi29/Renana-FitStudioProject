import React, { useContext, useState } from 'react'; // הוספנו useState

import PersonIcon from '@mui/icons-material/Person';
import { ShopContext } from '../../../ShopContext.js';
import { JoinUsModal } from '../../JoinUsModal/JoinUsModal.jsx';
import { AdminActions } from '../../admin/AdminActions/AdminActions.jsx';
import './Header.css';

export const Header = () => {
  const { user } = useContext(ShopContext);
  
  // 1. הגדרת ה-State לפתיחת המודל
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // פונקציית עזר לפתיחה
  const handleOpenModal = () => {
    // נפתח את המודל רק אם אין משתמש מחובר
    if (!user) {
      setIsAuthModalOpen(true);
    }
  };

  return (
   
    <div className="flexHeader">
      <h1 className="studio-title">GYM STUDIO</h1>
      <AdminActions />

      {/* 2. הוספת אירוע הלחיצה על כל אזור המשתמש */}
      <div 
        className="user-profile" 
        onClick={handleOpenModal} 
        style={{ cursor: user ? 'default' : 'pointer' }}
      >
        <PersonIcon className="profile-icon" />
        <span className="user-greeting">
          {user ? `Hello, ${user.name}` : "Hello, Guest"}
        </span>
      </div>

      {/* 3. הוספת רכיב המודל עצמו */}
      <JoinUsModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />
    </div>
   
  );
};