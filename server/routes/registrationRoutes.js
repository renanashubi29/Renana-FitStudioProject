import express from "express";
import { 
    getAllRegistrationsController, 
    getRegistrationByIdController, 
    createRegistrationController, 
    updateRegistrationController, 
    deleteRegistrationController, 
    resetRegistrationsController, 
    getUserRegistrationsController,
    getWorkoutRegistrationsController
} from "../controllers/registrationController.js";
import { verifyToken} from "../middlwares/auth.js";

const router = express.Router();


router.get("/", getAllRegistrationsController);


router.post("/",verifyToken, createRegistrationController);


router.post("/reset", resetRegistrationsController);


router.get("/:id", getRegistrationByIdController);


router.get("/user/:userId", getUserRegistrationsController);


router.get("/workout/:workoutId", getWorkoutRegistrationsController);


router.put("/:id", updateRegistrationController);


router.delete("/:id",verifyToken, deleteRegistrationController);

export default router;