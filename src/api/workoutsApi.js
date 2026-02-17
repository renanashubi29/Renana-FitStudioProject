export const handleWorkouts = async () => {
  const response = await fetch("http://localhost:5000/api/workouts");

  if (!response.ok) 
    throw new Error("Failed to fetch products");

  const result = await response.json();
 return result.data; 
};
// src/services/workoutService.js

export const resetWorkoutsFromCatalog = async () => {
  const response = await fetch("http://localhost:5000/api/workouts/resetfromCatalog", {
    method: "POST", // או PATCH, מה שהגדרת ב-Route בשרת
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "שגיאה באיפוס האימונים");
  }

  const result = await response.json();
  //console.log("response",result.data);
  return result.data; // מחזיר את רשימת האימונים החדשה
};
// src/api/workoutsApi.js

/**
 * פונקציה השולפת מהשרת רק את האימונים שמתקיימים מהרגע ועד שבוע הבא באותה שעה
 */
export const fetchNextSevenDaysWorkouts = async () => {
  const response = await fetch("http://localhost:5000/api/workouts/next-seven-days", {
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
  
  // מחזירים את המערך המסונן שנמצא בתוך result.data
  return result.data; 
};