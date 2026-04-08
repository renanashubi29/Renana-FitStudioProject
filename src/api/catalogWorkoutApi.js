const BASE_URL = `${import.meta.env.VITE_API_URL}/catalogWorkouts`;

/**
 * פונקציית עזר לקבלת ה-Token מהאחסון המקומי
 */
const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    };
};

// קבלת כל אימוני הקטלוג
export const getAllCatalogWorkoutsApi = async () => {
    try {
        const response = await fetch(`${BASE_URL}/`, {
            method: 'GET',
            headers: getAuthHeaders()
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || 'Error fetching catalog workouts');
        }

        return result.data; 
    } catch (error) {
        console.error("Fetch all catalog error:", error);
        throw error;
    }
};

// יצירת אימון קטלוג חדש
export const createCatalogWorkoutApi = async (workoutData) => {
    try {
        const response = await fetch(`${BASE_URL}/`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify(workoutData),
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || "Failed to create catalog workout");
        }

        return result.data;
    } catch (error) {
        console.error("Create catalog workout error:", error);
        throw error;
    }
};

// קבלת אימון קטלוג ספציפי לפי ID
export const getCatalogWorkoutByIdApi = async (id) => {
    try {
        const response = await fetch(`${BASE_URL}/${id}`, {
            method: 'GET',
            headers: getAuthHeaders()
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || 'Error fetching workout details');
        }

        return result.data;
    } catch (error) {
        console.error("Fetch workout by ID error:", error);
        throw error;
    }
};

// עדכון אימון קטלוג קיים
export const updateCatalogWorkoutApi = async (id, updateData) => {
    try {
        const response = await fetch(`${BASE_URL}/${id}`, {
            method: 'PUT',
            headers: getAuthHeaders(),
            body: JSON.stringify(updateData)
        });

        const result = await response.json();

     if (!response.ok) {
            const detailedError = result.error || result.message || 'Error updating catalog workout';
            throw new Error(detailedError);
        }

        return result.data;
    } catch (error) {
        console.error("Update catalog workout error:", error.message);
        throw error; 
    }
};

// מחיקת אימון מהקטלוג
export const deleteCatalogWorkoutApi = async (id) => {
    try {
        const response = await fetch(`${BASE_URL}/${id}`, {
            method: 'DELETE',
            headers: getAuthHeaders()
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || 'Error deleting catalog workout');
        }

        return result; 
    } catch (error) {
        console.error("Delete catalog workout error:", error);
        throw error;
    }
};

// איפוס הקטלוג (Reset)
export const resetCatalogApi = async () => {
    try {
        const response = await fetch(`${BASE_URL}/reset`, {
            method: 'POST',
            headers: getAuthHeaders()
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || 'Error resetting catalog');
        }

        return result;
    } catch (error) {
        console.error("Reset catalog error:", error);
        throw error;
    }
};