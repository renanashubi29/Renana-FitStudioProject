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

const router = express.Router();


router.get("/", getAllRegistrationsController);


router.post("/", createRegistrationController);


router.post("/reset", resetRegistrationsController);


router.get("/:id", getRegistrationByIdController);


router.get("/user/:userId", getUserRegistrationsController);


router.get("/workout/:workoutId", getWorkoutRegistrationsController);


router.put("/:id", updateRegistrationController);


router.delete("/:id", deleteRegistrationController);

export default router;