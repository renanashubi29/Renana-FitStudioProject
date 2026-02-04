
import fs from "fs";
import Plan from "../models/planModel.js";


// Get all plans
export const getAllPlans = async () => {
  try {
    return await Plan.find({});
  } catch (error) {
    throw new Error("Could not fetch plans: " + error.message);
  }
};

// Get plan by ID
export const getPlanById = async (id) => {
  try {
    return await Plan.findById(id);
  } catch (error) {
    throw new Error("Could not find plan: " + error.message);
  }
};

// Create a new plan
export const createPlan = async (data) => {
  try {
    const plan = new Plan(data);
    return await plan.save();
  } catch (error) {
    throw new Error("Could not create plan: " + error.message);
  }
};

// Delete plan
export const deletePlanById = async (id) => {
  try {
    return await Plan.findByIdAndDelete(id);
  } catch (error) {
    throw new Error("Could not delete plan: " + error.message);
  }
};

// Update plan
export const updatePlanById = async (id, data) => {
  try {
    // { new: true } returns the updated document instead of the old one
    // { runValidators: true } ensures the update follows your Schema rules (like enum)
    return await Plan.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  } catch (error) {
    throw new Error("Could not update plan: " + error.message);
  }
};

export const resetPlansFromFile = async () => {
  try {
   
    const data = fs.readFileSync("./server/json/plans.json", "utf-8");
    const plans = JSON.parse(data);
     await Plan.deleteMany({});
    return await Plan.insertMany(plans);
  } catch (error) {
    throw new Error("Could not reset plans: " + error.message);
  }
};