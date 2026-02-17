import { 
  createCatalogWorkout, 
  deleteCatalogWorkoutById, 
  getAllCatalogWorkouts, 
  getCatalogWorkoutById, 
  resetCatalogFromFile, 
  updateCatalogWorkoutById 
} from "../services/catalogWorkoutService.js";

import { serverResponse } from "../utils/serverResponse.js";
import { SuccessMessages, ErrorMessages } from "../utils/messages.js";

// קבלת כל אימוני הקטלוג
export const getAllCatalogWorkoutsController = async (req, res) => {
  try {
    const workouts = await getAllCatalogWorkouts();
    
    // במידה והרשימה ריקה
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

// קבלת אימון קטלוג לפי ID
export const getCatalogWorkoutByIdController = async (req, res) => {
  try {
    const workout = await getCatalogWorkoutById(req.params.id);
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

// יצירת אימון קטלוג חדש
export const createCatalogWorkoutController = async (req, res) => {
  try {
    const workoutData = { ...req.body };
    const savedWorkout = await createCatalogWorkout(workoutData);
    return serverResponse(res, 201, { 
      message: SuccessMessages.WORKOUTS.CREATED, 
      data: savedWorkout 
    });
  } catch (error) {
    // כאן השגיאה מהסרביס (למשל חפיפה בזמנים) תיתפס ותחזור למשתמש
    return serverResponse(res, 400, { 
      message: ErrorMessages.WORKOUTS.CREATE_FAILED, 
      error: error.message 
    });
  }
};

// איפוס הקטלוג מקובץ JSON
export const resetCatalogController = async (req, res) => {
  try {
    const allWorkouts = await resetCatalogFromFile();
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

// מחיקת אימון מהקטלוג
export const deleteCatalogWorkoutController = async (req, res) => {
  try {
    const deletedWorkout = await deleteCatalogWorkoutById(req.params.id);
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

// עדכון אימון בקטלוג
export const updateCatalogWorkoutController = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedWorkout = await updateCatalogWorkoutById(id, req.body);
    
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
    // במידה ויש חפיפה בזמן או ID לא תקין
    return serverResponse(res, 400, { 
      message: ErrorMessages.WORKOUTS.UPDATE_FAILED, 
      error: error.message 
    });
  }
};
