import User from "../models/userModel.js";
import { getAllPlans } from "./planService.js";
import fs from "fs";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

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
export const loginUserService = async (email, password) => {
  if (!email || !password) {
    const error = new Error("Email and password are required");
    error.status = 400;
    throw error;
  }

  const user = await User.findOne({ email }); // או getUserByEmail(email)
  if (!user) {
    const error = new Error("User not found");
    error.status = 404;
    throw error;
  }

  const isMatching = bcrypt.compareSync(password, user.password);
  if (!isMatching) {
    const error = new Error("Invalid credentials");
    error.status = 401;
    throw error;
  }

  //return user;

  // Create the Token
const token = jwt.sign(
  { sub: user._id, email: user.email }, // Payload
  process.env.JWT_SECRET, // Secret Key
  { expiresIn: "1d" }, // Options
);

// Return the user (without password) and the token
const userObject = user.toObject();
delete userObject.password;

return { user: userObject, token };

};
export const registerUserService = async (userData) => {
  if (!userData.password) {
    const error = new Error("Password is required");
    error.status = 400;
    throw error;
  }

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(userData.password, salt);

  const userToSave = { ...userData, password: hash };

  const user = await User.create(userToSave); // או createUser(userToSave)
 const token = jwt.sign(
  { sub: user._id, email: user.email }, // Payload
  process.env.JWT_SECRET, // Secret Key
  { expiresIn: "1d" }, // Options
);

// Return the user (without password) and the token
const userObject = user.toObject();
delete userObject.password;

return { user: userObject, token };

};
export const changePasswordService = async (id, oldPassword, newPassword) => {
  if (!oldPassword || !newPassword) {
    const error = new Error("Both passwords are required");
    error.status = 400;
    throw error;
  }

  const user = await User.findById(id);
  if (!user) {
    const error = new Error("User not found");
    error.status = 404;
    throw error;
  }

  const isMatching = bcrypt.compareSync(oldPassword, user.password);
  if (!isMatching) {
    const error = new Error("Old password is incorrect");
    error.status = 401;
    throw error;
  }

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(newPassword, salt);

  const updatedUser = await User.findOneAndUpdate(
    { _id: id },
    { password: hash },
    { new: true }
  );

  return updatedUser;
};
