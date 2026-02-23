import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router';
import { registerUserApi } from '../../api/userApi.js';
import { ShopContext } from '../../ShopContext.js';
import { InputFieldComp } from '../../components/common/InputFieldComp.jsx';

//import './LoginPage.css';
import { AddressAutocomplete } from '../../components/user/AddressAutocomplete/AddressAutocomplete.jsx';

export const RegisterPage = () => {
    const { setUser } = useContext(ShopContext);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        userName: '',
        email: '',
        phone: '',
        password: '',
        role: 'trainer', // קבוע למתאמנת
        address: { city: '', street: '', houseNumber: '' },
        plan: null // מתאמנת בד"כ מצטרפת לתוכנית
    });

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        // וולידציה בסיסית לכתובת
        if (!formData.address.city || !formData.address.street) {
            setError('Please select a valid address from the list');
            return;
        }

        // במקום להירשם עכשיו, עוברים לדף בחירת מנוי עם הנתונים בתוך ה-state
        navigate('/plansCards', { state: { tempTraineeData: formData } });
    };

    return (
        <div className="login-page-container">
            <div className="login-card" style={{ maxWidth: '500px' }}>
                <h2>Join FitStudio</h2>
                <p style={{ textAlign: 'center', color: '#666' }}>Create your trainee account</p>
                
                {error && <div className="error-msg" style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}

                <form onSubmit={handleSubmit}>
                    <InputFieldComp label="Full Name" name="name" value={formData.name} onChange={handleChange} required />
                    <InputFieldComp label="User Name" name="userName" value={formData.userName} onChange={handleChange} required />
                    <InputFieldComp label="Email" type="email" name="email" value={formData.email} onChange={handleChange} required />
                    <InputFieldComp label="Phone Number" name="phone" value={formData.phone} onChange={handleChange} required />
                    <InputFieldComp label="Password" type="password" name="password" value={formData.password} onChange={handleChange} required />

                    {/* רכיב הכתובת - מעדכן את האובייקט הפנימי */}
                    <AddressAutocomplete 
                        formData={formData} 
                        setFormData={setFormData} 
                    />

                    <button type="submit" className="login-btn" disabled={loading}>
                        {loading ? 'Creating Account...' : 'Sign Up'}
                    </button>
                </form>
            </div>
        </div>
    );
};