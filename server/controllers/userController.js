
import { 
  createUser, 
  deleteUserById, 
  getAllUsers, 
  getUserById, 
  resetUsersFromFile, 
  updateUserById 
} from "../services/userService.js";

export const resetUsersController =async(req,res)=>{

  try{
   
    const allUsers=await resetUsersFromFile();
    res.status(201).json(allUsers).end();
  }
   catch(error)
 {
    res.status(400).json({message:"Error reserting users",error:error.message});
 }
};




export const getAllUsersController = async (req, res) => {
  try {
    const users = await getAllUsers();
    res.send(users);
  } catch (error) {
    res.status(500).send({ message: "Error fetching users", error: error.message });
  }
};


export const getUserByIdController = async (req, res) => {
  try {
    const user = await getUserById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: `Invalid user id: ${req.params.id}`, error: error.message });
  }
};


export const createUserController = async (req, res) => {
  try {
    const savedUser = await createUser(req.body);
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(400).json({ message: "Error creating user", error: error.message });
  }
};




export const deleteUserController = async (req, res) => {
  try {
    const deletedUser = await deleteUserById(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found: could not delete" });
    }
    res.json({
      message: "User deleted successfully",
      user: deletedUser
    });
  } catch (error) {
    res.status(500).send({ message: "Error deleting user", error: error.message });
  }
};


export const updateUserController = async (req, res) => {
  try {
    const id = req.params.id;
    const updateData = { ...req.body };
    const updatedUser = await updateUserById(id, updateData);
    
    if (!updatedUser) {
      return res.status(404).send({ message: "User not found" });
    }
    res.send(updatedUser);
  } catch (error) {
    res.status(500).send({ message: "Error updating user", error: error.message });
  }
};