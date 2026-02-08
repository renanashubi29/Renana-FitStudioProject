import express from "express";
import { 
  getAllWorkoutsController, 
  getWorkoutByIdController, 
  createWorkoutController, 
  updateWorkoutController, 
  deleteWorkoutController, 
  resetWorkoutsController 
} from "../controllers/workoutController.js";
import { verifyToken } from "../middlwares/auth.js";

const router = express.Router();


router.get("/"/* ,verifyToken */, getAllWorkoutsController);


router.post("/", createWorkoutController);


router.post("/reset", resetWorkoutsController);


router.get("/:id", getWorkoutByIdController);


router.put("/:id", updateWorkoutController);


router.delete("/:id", deleteWorkoutController);

export default router;