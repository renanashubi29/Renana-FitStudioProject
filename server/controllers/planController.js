

import { 
  createPlan, 
  deletePlanById, 
  getAllPlans, 
  getPlanById, 
  resetPlansFromFile, 
  updatePlanById 
} from "../services/planService.js";


export const getAllPlansController = async (req, res) => {
  try {
    const plans = await getAllPlans();
    res.send(plans);
  } catch (error) {
    res.status(500).send({ message: "Error fetching plans", error: error.message });
  }
};


export const getPlanByIdController = async (req, res) => {
  try {
    const plan = await getPlanById(req.params.id);
    if (!plan) {
      return res.status(404).json({ message: "Plan not found" });
    }
    res.json(plan);
  } catch (error) {
    res.status(500).json({ message: `Invalid plan id: ${req.params.id}` });
  }
};


export const createPlanController = async (req, res) => {
  try {
    const savedPlan = await createPlan(req.body);
    res.status(201).json(savedPlan);
  } catch (error) {
    res.status(400).json({ message: "Error creating plan", error: error.message });
  }
};
export const resetPlansController = async (req, res) => {
  try {
  
    const allPlans = await resetPlansFromFile();
    
    
    res.status(201).json(allPlans);
  } catch (error) {
    // טיפול בשגיאות
    res.status(400).json({ 
      message: "Error resetting plans", 
      error: error.message 
    });
  }
};

export const deletePlanController = async (req, res) => {
  try {
    const deletedPlan = await deletePlanById(req.params.id);
    if (!deletedPlan) {
      return res.status(404).json({ message: "Plan not found: could not delete" });
    }
    res.json({
      message: "Plan deleted successfully",
      plan: deletedPlan
    });
  } catch (error) {
    res.status(500).send({ message: "Error deleting plan", error: error.message });
  }
};


export const updatePlanController = async (req, res) => {
  try {
    const id = req.params.id;
    const updateData = { ...req.body };
    const updatedPlan = await updatePlanById(id, updateData);
    
    if (!updatedPlan) {
      return res.status(404).send({ message: "Plan not found" });
    }
    res.send(updatedPlan);
  } catch (error) {
    res.status(500).send({ message: "Error updating plan", error: error.message });
  }
};