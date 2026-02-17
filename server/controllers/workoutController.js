import { 
  createWorkout, 
  deleteWorkoutById, 
  getAllWorkouts, 
  getWorkoutById, 
  getWorkoutsForNextSevenDays, 
  resetWorkoutsFromCatalog, 
  resetWorkoutsFromFile, 
  updateWorkoutById 
} from "../services/workoutService.js";


import { serverResponse } from "../utils/serverResponse.js";

import { SuccessMessages, ErrorMessages } from "../utils/messages.js";

export const getAllWorkoutsController = async (req, res) => {
  try {
    const workouts = await getAllWorkouts();
    if (!workouts || workouts.length === 0) {
      return serverResponse(res, 204, { 
        message: ErrorMessages.WORKOUTS.GET_ALL 
      });
    }
    return serverResponse(res, 200, { 
      message: SuccessMessages.WORKOUTS.GET_ALL, 
      data: workouts 
    });
  } catch (error) {
    return serverResponse(res, 500, { 
      message: ErrorMessages.WORKOUTS.GET_ALL, 
      error: error.message 
    });
  }
};

export const getWorkoutByIdController = async (req, res) => {
  try {
    const workout = await getWorkoutById(req.params.id);
    if (!workout) {
      return serverResponse(res, 404, { 
        message: ErrorMessages.WORKOUTS.NOT_FOUND 
      });
    }
    return serverResponse(res, 200, { 
      message: SuccessMessages.WORKOUTS.GET_BY_ID, 
      data: workout 
    });
  } catch (error) {
    return serverResponse(res, 500, { 
      message: ErrorMessages.GENERAL.INVALID_ID(req.params.id), 
      error: error.message 
    });
  }
};

export const createWorkoutController = async (req, res) => {
  try {
    const workoutData = { ...req.body }
    const savedWorkout = await createWorkout(workoutData);
    return serverResponse(res, 201, { 
      message: SuccessMessages.WORKOUTS.CREATED, 
      data: savedWorkout 
    });
  } catch (error) {
    return serverResponse(res, 400, { 
      message: ErrorMessages.WORKOUTS.CREATE_FAILED, 
      error: error.message 
    });
  }
};

export const resetWorkoutsController = async (req, res) => {
  try {
    const allWorkouts = await resetWorkoutsFromFile();
    return serverResponse(res, 201, { 
      message: SuccessMessages.WORKOUTS.RESET, 
      data: allWorkouts 
    });
  } catch (error) {
    return serverResponse(res, 400, { 
      message: ErrorMessages.WORKOUTS.RESET_FAILED, 
      error: error.message 
    });
  }
};

export const deleteWorkoutController = async (req, res) => {
  try {
    const deletedWorkout = await deleteWorkoutById(req.params.id);
    if (!deletedWorkout) {
      return serverResponse(res, 404, { 
        message: ErrorMessages.WORKOUTS.NOT_FOUND 
      });
    }
    return serverResponse(res, 200, { 
      message: SuccessMessages.WORKOUTS.DELETED, 
      data: deletedWorkout 
    });
  } catch (error) {
    return serverResponse(res, 500, { 
      message: ErrorMessages.WORKOUTS.DELETE_FAILED, 
      error: error.message 
    });
  }
};

export const updateWorkoutController = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedWorkout = await updateWorkoutById(id, req.body);
    if (!updatedWorkout) {
      return serverResponse(res, 404, { 
        message: ErrorMessages.WORKOUTS.NOT_FOUND 
      });
    }
    return serverResponse(res, 200, { 
      message: SuccessMessages.WORKOUTS.UPDATED, 
      data: updatedWorkout 
    });
  } catch (error) {
    return serverResponse(res, 400, { 
      message: ErrorMessages.WORKOUTS.UPDATE_FAILED, 
      error: error.message 
    });
  }
};
// סנכרון הקטלוג לתוך טבלת האימונים הפעילים
export const resetWorkoutsFromCatalogController = async (req, res) => {
  try {
    
    const createdWorkouts = await resetWorkoutsFromCatalog();

   
    if (!createdWorkouts || createdWorkouts.length === 0) {
      return serverResponse(res, 200, { 
        message: SuccessMessages.WORKOUTS.ALREADY_UP_TO_DATE 
      });
    }


    return serverResponse(res, 201, { 
      message: SuccessMessages.WORKOUTS.SYNC_CATALOG, 
      data: createdWorkouts 
    });

  } catch (error) {
   
    return serverResponse(res, 400, { 
      message: ErrorMessages.WORKOUTS.SYNC_CATALOG_FAILED, 
      error: error.message 
    });
  }
};
export const resetWorkouts = async () => {
  // בדרך כלל פעולות שמשנות נתונים בשרת (כמו ריסט) משתמשות ב-POST
  const response = await fetch("http://localhost:5000/api/workouts/reset", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    // זריקת שגיאה במידה והשרת החזיר סטטוס שאינו 200-299
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to reset workouts from catalog");
  }

  const result = await response.json();
  
  // מחזירים את ה-data (רשימת האימונים שנוצרו) כפי שהקונטרולר שולח
  return result.data;
};
export const getWorkoutsForNextSevenDaysController = async (req, res) => {
  try {

    // קריאה לפונקציה שמבצעת את הסינון הלוגי
    const workouts = await getWorkoutsForNextSevenDays();

    // החזרת תשובה סטנדרטית עם הנתונים המסוננים
    return serverResponse(res, 200, {
      message: "Upcoming workouts for the next 7 days fetched successfully",
      data: workouts
    });
  } catch (error) {
  
    // במקרה של שגיאה בחישוב התאריכים או בשליפה מה-DB
    return serverResponse(res, 400, {
      message: "Error fetching upcoming workouts",
      error: error.message
    });
  }
};