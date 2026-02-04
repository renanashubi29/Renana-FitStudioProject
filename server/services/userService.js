import User from "../models/userModel.js";
import { getAllPlans } from "./planService.js";
import fs from "fs";


// איפוס משתמשים עם בדיקת תקינות מנויים מול הסרביס
export const resetUsersFromFile = async () => {
  try {
  
    const data = fs.readFileSync("./server/json/users.json", "utf-8");
    const users = JSON.parse(data);

    
    const allPlans = await getAllPlans();
    
  
    const validPlanIds = allPlans.map(plan => plan._id.toString());

   
    for (const user of users) {
      if (user.plan) {
        if (!validPlanIds.includes(user.plan)) {
          throw new Error(`User "${user.name}" has an invalid Plan ID: ${user.plan}. Please check your JSON file.`);
        }
      }
    }

  
    await User.deleteMany({});
    const insertedUsers = await User.insertMany(users);
    
    return insertedUsers;
  } catch (error) {
  
    throw new Error("Reset Users Failed: " + error.message);
  }
};




export const getAllUsers = async () => {
  try {
  //לקבלת פרטי האובייקט מרפרנס
    return await User.find({}).populate("plan");
  } catch (error) {
    throw new Error("Could not fetch users: " + error.message);
  }
};


export const getUserById = async (id) => {
  try {
    return await User.findById(id).populate("plan");
  } catch (error) {
    throw new Error("Could not find user: " + error.message);
  }
};


export const createUser = async (data) => {
  try {
    const user = new User(data);
    return await user.save();
  } catch (error) {
    throw new Error("Could not create user: " + error.message);
  }
};


export const deleteUserById = async (id) => {
  try {
    return await User.findByIdAndDelete(id);
  } catch (error) {
    throw new Error("Could not delete user: " + error.message);
  }
};


export const updateUserById = async (id, data) => {
  try {
    // runValidators מוודא שהעדכון עומד בחוקי ה-enum וה-required
    return await User.findByIdAndUpdate(id, data, { new: true, runValidators: true }).populate("plan");
  } catch (error) {
    throw new Error("Could not update user: " + error.message);
  }
};

