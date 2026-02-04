import fs from "fs";
import Registration from "../models/registrationModel.js";
import User from "../models/userModel.js";
import Workout from "../models/workoutModel.js";


export const getAllRegistrations = async () => {
    try {
     
        return await Registration.find({}).populate("user").populate("workout");
    } catch (error) {
        throw new Error("Could not fetch registrations: " + error.message);
    }
};


export const getRegistrationById = async (id) => {
    try {
        const registration = await Registration.findById(id).populate("user").populate("workout");
        if (!registration) throw new Error("Registration not found");
        return registration;
    } catch (error) {
        throw new Error("Error finding registration: " + error.message);
    }
};


export const createRegistration = async (data) => {
    try {
       
        const userExists = await User.findById(data.user);
        if (!userExists) throw new Error("User not found - Registration failed");

        const workoutExists = await Workout.findById(data.workout);
        if (!workoutExists) throw new Error("Workout not found - Registration failed");

        const registration = new Registration(data);
        return await registration.save();
    } catch (error) {
        //אם המשתמש כבר רשום לאימון
        if (error.code === 11000) {
            throw new Error("User is already registered for this workout");
        }
        throw new Error("Could not create registration: " + error.message);
    }
};


export const updateRegistrationById = async (id, data) => {
    try {
   
        if (data.user) {
            const userExists = await User.findById(data.user);
            if (!userExists) throw new Error("New User ID not found");
        }
        if (data.workout) {
            const workoutExists = await Workout.findById(data.workout);
            if (!workoutExists) throw new Error("New Workout ID not found");
        }

        return await Registration.findByIdAndUpdate(id, data, { new: true, runValidators: true });
    } catch (error) {
        throw new Error("Could not update registration: " + error.message);
    }
};


export const deleteRegistrationById = async (id) => {
    try {
        return await Registration.findByIdAndDelete(id);
    } catch (error) {
        throw new Error("Could not delete registration: " + error.message);
    }
};


export const resetRegistrationsFromFile = async () => {
    try {
        const rawData = fs.readFileSync("./server/json/registration.json", "utf-8");
        const registrationsData = JSON.parse(rawData);
        
    
        for (const reg of registrationsData) {
        
            const userExists = await User.findById(reg.user);
            console.log(reg.user);
            if (!userExists) {
                throw new Error(`User with ID ${reg.user} not found in database. Reset aborted.`);
            }

       
            const workoutExists = await Workout.findById(reg.workout);
            console.log(workoutExists);
            if (!workoutExists) {
                throw new Error(`Workout with ID ${reg.workout} not found in database. Reset aborted.`);
            }
        }

       
        await Registration.deleteMany({});
        
      
        return await Registration.create(registrationsData);

    } catch (error) {
        throw new Error("Could not reset registrations: " + error.message);
    }
};