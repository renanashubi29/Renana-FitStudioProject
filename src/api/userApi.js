// src/api/authApi.js
const BASE_URL = `${import.meta.env.VITE_API_URL}/users`;
export const getAllUsersApi = async () => {
    try {
        const response = await fetch(`${BASE_URL}/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
                // אם השרת שלך דורש Token, תצטרכי להוסיף כאן:
                // 'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || 'שגיאה בטעינת המשתמשים');
        }

        return result.data; // מחזיר מערך של משתמשים
    } catch (error) {
        throw error;
    }
};
export const getAllCoachesApi = async () => {
    try {
        const response = await fetch(`${BASE_URL}/coaches`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
                // אם השרת שלך דורש Token, תצטרכי להוסיף כאן:
                // 'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || 'שגיאה בטעינת המשתמשים');
        }

        return result.data; // מחזיר מערך של משתמשים
    } catch (error) {
        throw error;
    }
};

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
// Create a new user (Admin functionality)
export const createUserApi = async (formData) => {
    try {
        const response = await fetch(`${BASE_URL}/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });
        const result = await response.json();
        if (!response.ok) throw new Error(result.message || 'Failed to create user');
        return result.data;
    } catch (error) {
        throw error;
    }
};

// Update an existing user by ID
export const updateUserApi = async (id, formData) => {
    try {
        const response = await fetch(`${BASE_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });
        const result = await response.json();
        if (!response.ok) throw new Error(result.message || 'Failed to update user');
        return result.data;
    } catch (error) {
        throw error;
    }
};

// Delete a user by ID
export const deleteUserApi = async (id) => {
    try {
        const response = await fetch(`${BASE_URL}/${id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        });
        const result = await response.json();
      if (!response.ok) {
            const errorMessage = result.error || result.message || 'Failed to delete user';
            throw new Error(errorMessage);
        }
        return result.data;
    } catch (error) {
        throw error;
    }
};

// Reset users collection (Careful: Usually for development only)
export const resetUsersApi = async () => {
    try {
        const response = await fetch(`${BASE_URL}/reset`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        });
        const result = await response.json();
        if (!response.ok) throw new Error(result.message || 'Failed to reset users');
        return result;
    } catch (error) {
        throw error;
    }
};
// קבלת פרטי המשתמש המחובר באמצעות הטוקן (לפתרון בעיית הריענון)
export const getUserByTokenApi = async () => {
    try {
        const token = localStorage.getItem('token');
        
        // אם אין טוקן, אין טעם בכלל לפנות לשרת
        if (!token) return null;

        const response = await fetch(`${BASE_URL}/getUserByToken`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        const result = await response.json();

        if (!response.ok) {
            // אם הטוקן לא תקין או פג תוקף
            localStorage.removeItem('token'); // מנקים את הטוקן הפגום
            throw new Error(result.message || 'Session expired');
        }

        return result; // מחזיר את אובייקט המשתמש המלא
    } catch (error) {
        throw error;
    }
};