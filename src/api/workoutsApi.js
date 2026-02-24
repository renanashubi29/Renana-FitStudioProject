
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