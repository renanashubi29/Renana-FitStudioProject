import { 
    getAllRegistrations, 
    getRegistrationById, 
    createRegistration, 
    updateRegistrationById, 
    deleteRegistrationById, 
    resetRegistrationsFromFile 
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

export const createRegistrationController = async (req, res) => {
    try {
        const registrationData = { ...req.body }
        const savedRegistration = await createRegistration(registrationData);
        return serverResponse(res, 201, { 
            message: SuccessMessages.REGISTRATIONS.CREATED, 
            data: savedRegistration 
        });
    } catch (error) {
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

export const deleteRegistrationController = async (req, res) => {
    try {
        const deletedRegistration = await deleteRegistrationById(req.params.id);
        if (!deletedRegistration) {
            return serverResponse(res, 404, { 
                message: ErrorMessages.REGISTRATIONS.NOT_FOUND 
            });
        }
        return serverResponse(res, 200, { 
            message: SuccessMessages.REGISTRATIONS.DELETED, 
            data: deletedRegistration 
        });
    } catch (error) {
        return serverResponse(res, 500, { 
            message: ErrorMessages.REGISTRATIONS.DELETE_FAILED, 
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