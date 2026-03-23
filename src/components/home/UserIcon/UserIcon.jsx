import React, { useContext, useState } from 'react';
import PersonIcon from '@mui/icons-material/Person';
import { JoinUsModal } from '../../JoinUsModal/JoinUsModal.jsx';
import { ShopContext } from '../../../ShopContext.js';

const UserIcon = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
const { user } = useContext(ShopContext);
  return (
    <div className="user-icon-wrapper">
      <div 
        className="user-profile" 
        style={{ cursor: user ? 'default' : 'pointer' }}
      >
        <PersonIcon className="profile-icon" />
        <span className="user-greeting">
          {user ? `Hello, ${user.name}` : "Hello, Guest"}
        </span>
      </div>
    </div>
  );
};


export default UserIcon;