import React, { useContext } from 'react';
import { useNavigate } from 'react-router';

import './AdminActions.css';
import { ShopContext } from '../../../ShopContext';

export const AdminActions = () => {
    const { user } = useContext(ShopContext);
    const navigate = useNavigate();

    
    if (user?.role !== 'admin') {
        return null;
    }

    const handleNavigation = (e) => {
        const path = e.target.value;
        if (path) {
            navigate(path);
        }
    };

    return (
        <div className="admin-actions-wrapper">
            <select className="admin-select" onChange={handleNavigation} defaultValue="">
                <option value="" disabled>Admin Management</option>
                <option value="/manage-catalog">Manage Training Catalog</option>
                <option value="/manage-trainings">Manage Trainings</option>
                <option value="/manage-users">Manage Users</option>
                <option value="/manage-registrations">Manage Registrations</option>
            </select>
        </div>
    );
};