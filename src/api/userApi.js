
const BASE_URL = `${import.meta.env.VITE_API_URL}/users`;
export const getAllUsersApi = async () => {
    try {
        const response = await fetch(`${BASE_URL}/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
                
            }
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || 'שגיאה בטעינת המשתמשים');
        }

        return result.data; 
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
             
            }
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || 'שגיאה בטעינת המשתמשים');
        }

        return result.data; 
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
    
            throw new Error(result.message || 'שגיאה בהתחברות');
        }

        return result; 
    } catch (error) {

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
          
            throw new Error(result.message || 'שגיאה בהתחברות');
        }

        return result; 
    } catch (error) {
       
        throw error;
    }
};

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
            
            localStorage.removeItem('token'); 
            throw new Error(result.message || 'Session expired');
        }

        return result; 
    } catch (error) {
        throw error;
    }
};