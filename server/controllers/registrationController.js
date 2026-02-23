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
        const userId = req.params.userId;
        const registrations = await getRegistrationsByUser(userId);

        if (!registrations || registrations.length === 0) {
            return serverResponse(res, 200, { 
                message: ErrorMessages.REGISTRATIONS.NO_USER_REGISTRATIONS, 
                data: [] 
            });
        }

        return serverResponse(res, 200, { 
            message: SuccessMessages.REGISTRATIONS.GET_BY_USER, 
            data: registrations 
        });
    } catch (error) {
        return serverResponse(res, 500, { 
            message: ErrorMessages.REGISTRATIONS.GET_BY_USER, 
            error: error.message 
        });
    }
};
export const getWorkoutRegistrationsController = async (req, res) => {
    try {
        const { workoutId } = req.params;
        const registrations = await getRegistrationsByWorkout(workoutId);

        if (!registrations || registrations.length === 0) {
            return serverResponse(res, 200, { 
                message: ErrorMessages.REGISTRATIONS.NO_WORKOUT_REGISTRATIONS, 
                data: [] 
            });
        }

        return serverResponse(res, 200, { 
            message: SuccessMessages.REGISTRATIONS.GET_BY_WORKOUT, 
            data: registrations 
        });
    } catch (error) {
        return serverResponse(res, 500, { 
            message: ErrorMessages.REGISTRATIONS.GET_BY_WORKOUT, 
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
            return serverResponse(res, 400, { 
                message: ErrorMessages.REGISTRATIONS.ID_MISSING 
            });
        }

        const result = await deleteRegistrationById(id);

        return serverResponse(res, 200, {
            message: SuccessMessages.REGISTRATIONS.DELETED,
            data: { promotedFromWaitlist: result.promotedFromWaitlist }
        });

    } catch (error) {
        const errorMessage = error.message;

        if (errorMessage.includes("less than 24 hours")) {
            return serverResponse(res, 403, { 
                message: ErrorMessages.REGISTRATIONS.TOO_LATE_TO_CANCEL 
            });
        }

        if (errorMessage.includes("not found")) {
            return serverResponse(res, 404, { 
                message: ErrorMessages.REGISTRATIONS.NOT_FOUND 
            });
        }

        return serverResponse(res, 500, { 
            message: ErrorMessages.REGISTRATIONS.DELETE_FAILED, 
            error: errorMessage 
        });
    }
};