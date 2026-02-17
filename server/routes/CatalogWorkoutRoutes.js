import express from "express";
import { 
  getAllCatalogWorkoutsController, 
  getCatalogWorkoutByIdController, 
  createCatalogWorkoutController, 
  updateCatalogWorkoutController, 
  deleteCatalogWorkoutController, 
  resetCatalogController 
} from "../controllers/catalogWorkoutController.js"; // ודאי שזה השם שנתת לקובץ


const router = express.Router();

// קבלת כל אימוני הקטלוג
router.get("/", getAllCatalogWorkoutsController);

// יצירת אימון קטלוג חדש
router.post("/", createCatalogWorkoutController);

// איפוס הקטלוג מקובץ JSON
router.post("/reset", resetCatalogController );


// קבלת אימון קטלוג לפי ID
router.get("/:id", getCatalogWorkoutByIdController);

// עדכון אימון קטלוג קיים
router.put("/:id", updateCatalogWorkoutController);

// מחיקת אימון מהקטלוג
router.delete("/:id", deleteCatalogWorkoutController);

export default router;