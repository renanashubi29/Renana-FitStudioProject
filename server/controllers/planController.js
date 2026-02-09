import { serverResponse } from "../utils/serverResponse.js";

import { 
  createPlan, 
  deletePlanById, 
  getAllPlans, 
  getPlanById, 
  resetPlansFromFile, 
  updatePlanById 
} from "../services/planService.js";
import { ErrorMessages, SuccessMessages } from "../utils/messages.js";

export const getAllPlansController = async (req, res) => {
  try {
    const plans = await getAllPlans();

    if (!plans || plans.length === 0) {
      return serverResponse(res, 204, { 
        message: ErrorMessages.PLANS.GET_ALL 
      }); 
    }

    return serverResponse(res, 200, { 
        message: SuccessMessages.PLANS.GET_ALL, 
        data: plans 
    });

  } catch (error) {
    return serverResponse(res, 500, { 
        message: ErrorMessages.PLANS.GET_ALL, 
        error: error.message 
    });
  }
};

export const getPlanByIdController = async (req, res) => {
    try {
        const plan = await getPlanById(req.params.id);
        if (!plan) {
            return serverResponse(res, 404, { 
                message: ErrorMessages.PLANS.NOT_FOUND 
            });
        }
        return serverResponse(res, 200, { 
            message: SuccessMessages.PLANS.GET_BY_ID, 
            data: plan 
        });
    } catch (error) {
        return serverResponse(res, 500, { 
            message: ErrorMessages.GENERAL.INVALID_ID(req.params.id), 
            error: error.message 
        });
    }
};

export const createPlanController = async (req, res) => {
    try {
        const planData = { ...req.body };
        const savedPlan = await createPlan(planData);
        return serverResponse(res, 201, { 
            message: SuccessMessages.PLANS.CREATED, 
            data: savedPlan 
        });
    } catch (error) {
        return serverResponse(res, 400, { 
            message: ErrorMessages.PLANS.CREATE_FAILED, 
            error: error.message 
        });
    }
};

export const resetPlansController = async (req, res) => {
    try {
        const allPlans = await resetPlansFromFile();
        return serverResponse(res, 201, { 
            message: SuccessMessages.PLANS.RESET, 
            data: allPlans 
        });
    } catch (error) {
        return serverResponse(res, 400, { 
            message: ErrorMessages.PLANS.RESET_FAILED, 
            error: error.message 
        });
    }
};

export const deletePlanController = async (req, res) => {
    try {
        const deletedPlan = await deletePlanById(req.params.id);
        if (!deletedPlan) {
            return serverResponse(res, 404, { 
                message: ErrorMessages.PLANS.NOT_FOUND 
            });
        }
        return serverResponse(res, 200, { 
            message: SuccessMessages.PLANS.DELETED, 
            data: deletedPlan 
        });
    } catch (error) {
        return serverResponse(res, 500, { 
            message: ErrorMessages.PLANS.DELETE_FAILED, 
            error: error.message 
        });
    }
};

export const updatePlanController = async (req, res) => {
    try {
        const id = req.params.id;
        const updateData = { ...req.body };
        const updatedPlan = await updatePlanById(id, updateData);
        
        if (!updatedPlan) {
            return serverResponse(res, 404, { 
                message: ErrorMessages.PLANS.NOT_FOUND 
            });
        }
        return serverResponse(res, 200, { 
            message: SuccessMessages.PLANS.UPDATED, 
            data: updatedPlan 
        });
    } catch (error) {
        return serverResponse(res, 500, { 
            message: ErrorMessages.PLANS.UPDATE_FAILED, 
            error: error.message 
        });
    }
};


