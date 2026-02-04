import express from "express";
import { 
  getAllUsersController, 
  getUserByIdController, 
  createUserController, 
  updateUserController, 
  deleteUserController, 
  resetUsersController 
} from "../controllers/userController.js";

const router = express.Router();


router.get("/", getAllUsersController);


router.post("/", createUserController);


router.post("/reset", resetUsersController);




router.get("/:id", getUserByIdController);


router.put("/:id", updateUserController);


router.delete("/:id", deleteUserController);

export default router;
