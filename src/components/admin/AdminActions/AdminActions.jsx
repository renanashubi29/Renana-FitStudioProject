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
            // חשוב: איפוס ה-Select כדי שיוכלו לבחור שוב את אותו עמוד אם יחזרו
            e.target.value = ""; 
        }
    };

    return (
        <div className="admin-actions-wrapper">
            <select className="admin-select" onChange={handleNavigation} defaultValue="">
                <option value="" disabled>Admin Management</option>
                
                {/* כאן השינוי המרכזי - ה-value חייב להתאים ל-path בראוטר */}
                <option value="/admin/catalogWorkouts">Manage Training Catalog</option>
                <option value="/admin/workouts">Manage Trainings</option>
                <option value="/admin/users">Manage Users</option>
                <option value="/admin/registrations">Manage Registrations</option>
            </select>
        </div>
    );
};