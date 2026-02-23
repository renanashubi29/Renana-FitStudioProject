// src/api/authApi.js
const BASE_URL = `${import.meta.env.VITE_API_URL}/users`;

export const loginUserApi = async (formData) => {
    try {
        const response = await fetch(`${BASE_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        const result = await response.json();

        if (!response.ok) {
            // אם השרת החזיר שגיאה (למשל סיסמה שגויה)
            throw new Error(result.message || 'שגיאה בהתחברות');
        }

        return result; // מחזיר את הנתונים (כמו Token או שם משתמש)
    } catch (error) {
        // זורק את השגיאה הלאה כדי שנוכל להציג אותה ב-UI
        throw error;
    }
};
export const registerUserApi= async (formData) => {
    try {
        const response = await fetch(`${BASE_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        const result = await response.json();

        if (!response.ok) {
            // אם השרת החזיר שגיאה (למשל סיסמה שגויה)
            throw new Error(result.message || 'שגיאה בהתחברות');
        }

        return result; // מחזיר את הנתונים (כמו Token או שם משתמש)
    } catch (error) {
        // זורק את השגיאה הלאה כדי שנוכל להציג אותה ב-UI
        throw error;
    }
};