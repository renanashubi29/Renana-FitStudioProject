import React, { useState, useContext } from 'react';
import { loginUserApi, registerUserApi } from '../../api/userApi.js';
import { ShopContext } from '../../ShopContext.js';
import { useNavigate } from 'react-router';
import { FormModal } from '../admin/FormModal/FormModal.jsx';
import './JoinUsModal.css';
import { showStudioAlert } from '../studioAlert/studioAlert.jsx';
export const JoinUsModal = ({ isOpen, onClose }) => {
    const [isLoginView, setIsLoginView] = useState(true);
    const { setUser } = useContext(ShopContext);
    const navigate = useNavigate();

    // הגדרת השדות עבור התחברות
    const loginFields = [
        { name: 'email', label: 'Email Address', type: 'email', required: true },
        { name: 'password', label: 'Password', type: 'password', required: true }
    ];

    // הגדרת השדות עבור הרשמה (לפי הקוד שלך)
    const registerFields = [
        { name: 'name', label: 'Full Name', required: true },
        { name: 'userName', label: 'User Name', required: true },
        { name: 'email', label: 'Email', type: 'email', required: true },
        { name: 'phone', label: 'Phone Number', required: true },
        { name: 'password', label: 'Password', type: 'password', required: true },
        { type: 'address-autocomplete' } // הרכיב המיוחד שלך
    ];

    const handleAuthSubmit = async (formData) => {
        try {
            if (isLoginView) {
                // לוגיקת התחברות
                const response = await loginUserApi(formData);
                if (response.data?.token) localStorage.setItem('token', response.data.token);
                if (response.data?.user) setUser(response.data.user);
                onClose();
            } else {
                // לוגיקת הרשמה - מעבר לבחירת מנוי
                onClose();
                navigate('/plansCards', { state: { tempTraineeData: formData } });
            }
        } catch (err) {
       

    showStudioAlert("Wait!", err, "error");
        }
    };

    return (
        <FormModal
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleAuthSubmit}
            title={
                <div className="modal-tabs">
                    <button 
                        className={`tab-btn ${isLoginView ? 'active' : ''}`}
                        onClick={() => setIsLoginView(true)}
                    >
                        Login
                    </button>
                    <button 
                        className={`tab-btn ${!isLoginView ? 'active' : ''}`}
                        onClick={() => setIsLoginView(false)}
                    >
                        Register
                    </button>
                </div>
            }
            fields={isLoginView ? loginFields : registerFields}
            initialData={isLoginView ? {email: '', password: ''} : {role: 'trainer'}}
            submitButtonText={isLoginView?"Login":"Register"}
        />
    );
};