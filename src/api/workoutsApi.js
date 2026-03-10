
const BASE_URL = `${import.meta.env.VITE_API_URL}/workouts`;

export const getAllWorkoutsApi = async () => {
  try {
    const response = await fetch(`${BASE_URL}/`);

    if (!response.ok) 
      throw new Error("Failed to fetch workouts"); // תיקנתי מ-products ל-workouts

    const result = await response.json();
    return result.data; 
  } catch (error) {
    console.error("Error in getAllWorkoutsApi:", error);
    throw error;
  }
};
// 2. Create a new workout
export const createWorkoutApi = async (workoutData) => {
  try {
    const response = await fetch(`${BASE_URL}/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(workoutData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to create workout");
    }

    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error("Error in createWorkoutApi:", error);
    throw error;
  }
};

// 3. Update an existing workout
export const updateWorkoutApi = async (id, workoutData) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(workoutData),
    });

  if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || errorData.message || "Failed to update workout");
    }

    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error("Error in updateWorkoutApi:", error);
    throw error;
  }
};

// 4. Delete a workout
export const deleteWorkoutApi = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to delete workout");
    }

    return await response.json();
  } catch (error) {
    console.error("Error in deleteWorkoutApi:", error);
    throw error;
  }
};
export const resetWorkoutsFromCatalog = async () => {
  try {
    const response = await fetch(`${BASE_URL}/resetfromCatalog`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "שגיאה באיפוס האימונים");
    }

    const result = await response.json();
    return result.data; 
  } catch (error) {
    console.error("Error in resetWorkoutsFromCatalog:", error);
    throw error;
  }
};

/**
 * פונקציה השולפת מהשרת רק את האימונים שמתקיימים מהרגע ועד שבוע הבא
 */
export const getWorkoutsForThisWeekApi = async () => {
  try {
    const response = await fetch(`${BASE_URL}/next-seven-days`, {
      method: "GET",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "נכשלה שליפת אימוני השבוע הקרוב");
    }

    const result = await response.json();
    return result.data; 
  } catch (error) {
    console.error("Error in getWorkoutsForThisWeekApi:", error);
    throw error;
  }
};