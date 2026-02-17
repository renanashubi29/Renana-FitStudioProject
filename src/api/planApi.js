export const getAllPlans = async () => {
    try {
        // שימוש ב-GET כפי שהגדרת בראוטר
        const response = await fetch("http://localhost:5000/api/plans", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const result = await response.json();

        if (!response.ok) {
            // אם השרת החזיר שגיאה (למשל 404 או 500)
            throw new Error(result.message || 'שגיאה בטעינת המנויים');
        }

        // מחזיר את מערך המנויים (לפי ה-Controller שכתבנו, זה נמצא בתוך result.data)
        return result.data; 
    } catch (error) {
        // זורק את השגיאה הלאה לשימוש בקומפוננטה (למשל להצגת Alert)
        console.error("Fetch plans error:", error);
        throw error;
    }
};