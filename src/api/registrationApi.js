const BASE_URL = `${import.meta.env.VITE_API_URL}/registrations`;

export const getAllRegistrationsApi = async () => {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${BASE_URL}/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || 'Error fetching all registrations');
        }

       
        return result.data; 

    } catch (error) {
        console.error("Fetch all registrations error:", error);
        throw error; 
    }
};
//רישום לאימון
export const createRegistrationApi = async (userId, workoutId) => {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${BASE_URL}`, {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ 
                user: userId, 
                workout: workoutId,

            }),
        });

        const result = await response.json();

       
        if (!response.ok) {
         
            throw new Error(result.error || result.message || "Registration failed");
        }

        return result.data;
    } catch (error) {
        console.error("API Error:", error.message);
        throw error; 
    }
};
export const deleteRegistrationApi = async (registrationId) => {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${BASE_URL}/${registrationId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                 'Authorization': `Bearer ${token}`
            }
        });

        const result = await response.json();

        if (!response.ok) {
          
            throw new Error(result.message || 'Error deleting registration');
        }

        return result 
        
    } catch (error) {
        console.error("Delete registration error:", error);
        throw error; 
    }
};
//מערך של כל הרישומים של משתמש מסויים
export const getAllRegistrationsOfUserApi = async (userId) => {
    try {
       
        const response = await fetch(`${BASE_URL}/user/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                
            }
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || 'שגיאה במשיכת הרישומים');
        }

       
        return result.data; 
        
    } catch (error) {
        console.error("Fetch registrations error:", error);
        return []; 
    }
};
//מחזירה מערך של כל המשתתפחם באימון ספציפי
export const getAllParticipantsInWorkoutApi = async (workoutId) => {
    try {
  
        const response = await fetch(`${BASE_URL}/workout/${workoutId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            
            }
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || 'שגיאה במשיכת רשימת הנרשמים');
        }

      
        return result.data; 
        
    } catch (error) {
        console.error("Fetch workout registrations error:", error);
        return []; 
    }
};
