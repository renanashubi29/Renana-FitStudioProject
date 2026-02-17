import { 
    getAllRegistrations, 
    getRegistrationById, 
    createRegistration, 
    updateRegistrationById, 
    deleteRegistrationById, 
    resetRegistrationsFromFile, 
    getRegistrationsByUser,
    getRegistrationsByWorkout
} from "../services/registrationService.js";


import { serverResponse } from "../utils/serverResponse.js";

import { SuccessMessages, ErrorMessages } from "../utils/messages.js";

export const getAllRegistrationsController = async (req, res) => {
    try {
        const registrations = await getAllRegistrations();
        if (!registrations || registrations.length === 0) {
            return serverResponse(res, 204, { 
                message: ErrorMessages.REGISTRATIONS.GET_ALL 
            });
        }
        return serverResponse(res, 200, { 
            message: SuccessMessages.REGISTRATIONS.GET_ALL, 
            data: registrations 
        });
    } catch (error) {
        return serverResponse(res, 500, { 
            message: ErrorMessages.REGISTRATIONS.GET_ALL, 
            error: error.message 
        });
    }
};

export const getRegistrationByIdController = async (req, res) => {
    try {
        const registration = await getRegistrationById(req.params.id);
        if (!registration) {
            return serverResponse(res, 404, { 
                message: ErrorMessages.REGISTRATIONS.NOT_FOUND 
            });
        }
        return serverResponse(res, 200, { 
            message: SuccessMessages.REGISTRATIONS.GET_BY_ID, 
            data: registration 
        });
    } catch (error) {
        return serverResponse(res, 500, { 
            message: ErrorMessages.GENERAL.INVALID_ID(req.params.id), 
            error: error.message 
        });
    }
};
export const getUserRegistrationsController = async (req, res) => {
    try {
        // 1. שליפת ה-ID מהפרמטרים של הכתובת
        const userId = req.params.userId;

        // 2. קריאה לפונקציית הסרביס שכתבת קודם
        const registrations = await getRegistrationsByUser(userId);

        // 3. בדיקה אם נמצאו רישומים (אופציונלי - תלוי אם את רוצה 404 כשאין רישומים או פשוט מערך ריק)
        if (!registrations || registrations.length === 0) {
            return serverResponse(res, 200, { 
                message: "לא נמצאו רישומים למשתמש זה", 
                data: [] 
            });
        }

        // 4. החזרת תשובה חיובית בפורמט שלך
        return serverResponse(res, 200, { 
            message: SuccessMessages.REGISTRATIONS.GET_ALL, // ודאי שקיים אצלך אובייקט כזה
            data: registrations 
        });

    } catch (error) {
        // 5. טיפול בשגיאה בפורמט שלך
        return serverResponse(res, 500, { 
            message: "שגיאה בשליפת רישומי המשתמש", 
            error: error.message 
        });
    }
};
export const getWorkoutRegistrationsController = async (req, res) => {
    try {
        // 1. שליפת ה-ID של האימון מהפרמטרים של הכתובת (נניח שזה מגיע כ-workoutId)
        const { workoutId } = req.params;

        // 2. קריאה לפונקציית הסרביס החדשה ששולפת לפי אימון
        const registrations = await getRegistrationsByWorkout(workoutId);

        // 3. בדיקה אם נמצאו נרשמים
        if (!registrations || registrations.length === 0) {
            return serverResponse(res, 200, { 
                message: "עדיין אין נרשמים לאימון זה", 
                data: [] 
            });
        }

        // 4. החזרת תשובה חיובית עם רשימת המתאמנים
        return serverResponse(res, 200, { 
            message: "רשימת הנרשמים לאימון נשלפה בהצלחה", 
            data: registrations 
        });

    } catch (error) {
        // 5. טיפול בשגיאה
        return serverResponse(res, 500, { 
            message: "שגיאה בשליפת רשימת הנרשמים לאימון", 
            error: error.message 
        });
    }
};
export const createRegistrationController = async (req, res) => {
    try {
        // יצירת עותק נקי של הנתונים בעזרת Spread Operator
        const registrationData = { ...req.body };
        
        // שליחת העותק לסרביס שכתבנו קודם
        const savedRegistration = await createRegistration(registrationData);
        
        return serverResponse(res, 201, { 
            message: SuccessMessages.REGISTRATIONS.CREATED, 
            data: savedRegistration 
        });
    } catch (error) {
        // תופס את כל השגיאות (מנוי מלא, כבר רשום וכו')
        return serverResponse(res, 400, { 
            message: ErrorMessages.REGISTRATIONS.CREATE_FAILED, 
            error: error.message 
        });
    }
};



export const updateRegistrationController = async (req, res) => {
    try {
        const id = req.params.id;
        const updatedRegistration = await updateRegistrationById(id, req.body);
        
        if (!updatedRegistration) {
            return serverResponse(res, 404, { 
                message: ErrorMessages.REGISTRATIONS.NOT_FOUND 
            });
        }
        return serverResponse(res, 200, { 
            message: SuccessMessages.REGISTRATIONS.UPDATED, 
            data: updatedRegistration 
        });
    } catch (error) {
        return serverResponse(res, 500, { 
            message: ErrorMessages.REGISTRATIONS.UPDATE_FAILED, 
            error: error.message 
        });
    }
};


export const resetRegistrationsController = async (req, res) => {
    try {
        const allRegistrations = await resetRegistrationsFromFile();
        return serverResponse(res, 201, { 
            message: SuccessMessages.REGISTRATIONS.RESET, 
            data: allRegistrations 
        });
    } catch (error) {
        return serverResponse(res, 400, { 
            message: ErrorMessages.REGISTRATIONS.RESET_FAILED, 
            error: error.message 
        });
    }
};
export const deleteRegistrationController = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ 
                success: false, 
                message: "Registration ID is missing" 
            });
        }

        // Executing the cancellation logic
        const result = await deleteRegistrationById(id);

        // Success response
        res.status(200).json({
            success: true,
            message: "Registration cancelled successfully",
            promotedFromWaitlist: result.promotedFromWaitlist 
        });

    } catch (error) {
        const errorMessage = error.message;

        // Handling specific logic errors
        if (errorMessage.includes("less than 24 hours")) {
            return res.status(403).json({ 
                success: false, 
                message: "Cancellation blocked: Less than 24 hours remaining until workout" 
            });
        }

        if (errorMessage.includes("not found")) {
            return res.status(404).json({ 
                success: false, 
                message: "Registration not found" 
            });
        }

        // Generic server error
        res.status(500).json({ 
            success: false, 
            message: "An internal error occurred during cancellation", 
            error: errorMessage 
        });
    }
};