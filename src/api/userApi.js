// src/api/authApi.js

export const loginUser = async (formData) => {
    try {
        const response = await fetch("http://localhost:5000/api/users/login", {
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
export const registerUser= async (formData) => {
    try {
        const response = await fetch("http://localhost:5000/api/users/register", {
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