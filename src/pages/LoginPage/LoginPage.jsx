import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router'; // ייבוא ה-Hook לניווט
import { loginUser } from '../../api/authApi.js';
import './LoginPage.css';
import { ShopContext } from '../../ShopContext.js';
import { InputFieldComp } from '../../components/common/InputFieldComp.jsx';

export const LoginPage = () => {
    const { setUser } = useContext(ShopContext);
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    
   
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await loginUser(formData);
console.log("The inner data:", response.data); 

// שמירת הטוקן - הוא נמצא בתוך response.data.token
if (response.data && response.data.token) {
    localStorage.setItem('token', response.data.token);
}

//  עדכון המשתמש ב-Context - הוא נמצא בתוך response.data.user
if (response.data && response.data.user) {
    setUser(response.data.user); 
    console.log("Success! User set to:", response.data.user);
}
            //ניווט עמוד הבית
            navigate('/'); 
            
        } catch (err) {
            setError('Invalid login credentials, please try again');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page-container">
            <div className="login-card">
                <h2>Login</h2>
                
             
                {error && <div className="error-msg" style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
                
                <form onSubmit={handleSubmit}>
                   <InputFieldComp 
                   label="Email Address"
                    type="email"
                    name="email"
                     value={formData.email}
                     onChange={handleChange}
                     required />
                    
                   <InputFieldComp 
                    label="Password"
                     type="password"
                     name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required />
                    
                    <button type="submit" className="login-btn" disabled={loading}>
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;