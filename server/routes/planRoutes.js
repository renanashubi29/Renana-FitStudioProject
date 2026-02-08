import express from "express";
import { 
  getAllPlansController, 
  getPlanByIdController, 
  createPlanController, 
  updatePlanController, 
  deletePlanController, 
  resetPlansController 
} from "../controllers/planController.js";

const router = express.Router();




router.get("/", getAllPlansController);


router.post("/", createPlanController);


router.post("/reset", resetPlansController);


router.get("/:id", getPlanByIdController);


router.put("/:id", updatePlanController);


router.delete("/:id", deletePlanController);

export default router;