const BASE_URL = `${import.meta.env.VITE_API_URL}/registrations`;
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
            //הודעת השגיאה שנזרקה
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
            // כאן נקבל את הודעת ה-24 שעות מהשרת באנגלית
            throw new Error(result.message || 'Error deleting registration');
        }

        return result // מחזיר את האובייקט עם ה-message וה-promotedFromWaitlist
        
    } catch (error) {
        console.error("Delete registration error:", error);
        throw error; // חשוב לזרוק את השגיאה כדי שה-UI יוכל להציג אותה למשתמש
    }
};
//מערך של כל הרישומים של משתמש מסויים
export const getAllRegistrationsOfUserApi = async (userId) => {
    try {
       
        const response = await fetch(`${BASE_URL}/user/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                // אם יש לך טוקן ב-localStorage, כדאי להוסיף אותו כאן בעתיד:
                // 'Authorization': `Bearer ${localStorage.getItem('token')}`
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
        // שינוי ה-URL לכתובת של האימון (workout) במקום המשתמש (user)
        const response = await fetch(`${BASE_URL}/workout/${workoutId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                // אם בעתיד תוסיף אימות (Middleware), כאן ייכנס הטוקן:
                // 'Authorization': `Bearer ${localStorage.getItem('token')}`
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
