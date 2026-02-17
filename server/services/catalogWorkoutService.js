import fs from "fs";
import CatalogWorkout from "../models/catalogWorkoutModel.js"; // וודאי שהנתיב נכון
import { getMinutesFromStartOfDay } from "../utils/dateUtil.js";

// קבלת כל אימוני הקטלוג
export const getAllCatalogWorkouts = async () => {
  try {
    return await CatalogWorkout.find({});
  } catch (error) {
    throw new Error("Could not fetch catalog workouts: " + error.message);
  }
};

// קבלת אימון קטלוג לפי ID
export const getCatalogWorkoutById = async (id) => {
  try {
    return await CatalogWorkout.findById(id);
  } catch (error) {
    throw new Error("Could not find catalog workout: " + error.message);
  }
};

// יצירת אימון קטלוג חדש
export const createCatalogWorkout = async (data) => {
  try {
    //  בדיקת שדות חובה
    if (!data.time || !data.dayOfWeek || !data.roomName) {
      throw new Error("Missing required fields: time, dayOfWeek, or roomName");
    }

    // רשימה של כל האימונים באותו היום ובאותו החדר
    const existingWorkouts = await CatalogWorkout.find({
      roomName: data.roomName,
      dayOfWeek: data.dayOfWeek
    });

    const newWorkoutMinutes = getMinutesFromStartOfDay(data.time);

    for (const workout of existingWorkouts) {
      const existingMinutes = getMinutesFromStartOfDay(workout.time);
      const diff = Math.abs(newWorkoutMinutes - existingMinutes);

      if (diff < 60) {
        throw new Error(`Conflict: Room ${data.roomName} is busy on ${data.dayOfWeek} at ${workout.time}`);
      }
    }

    // 3. יצירה ושמירה
    const newCatalogWorkout = new CatalogWorkout(data);
    return await newCatalogWorkout.save();

  } catch (error) {
    throw error;
  }
};

// עדכון אימון קטלוג
export const updateCatalogWorkoutById = async (id, data) => {
  try {
  
    const currentWorkout = await CatalogWorkout.findById(id);
    if (!currentWorkout) throw new Error("Catalog workout not found");

    
    const roomName = data.roomName || currentWorkout.roomName;
    const dayOfWeek = data.dayOfWeek || currentWorkout.dayOfWeek;
    const time = data.time || currentWorkout.time;

    const newWorkoutMinutes = getMinutesFromStartOfDay(time);


    const allWorkouts = await getAllCatalogWorkouts();
    

    const conflicts = allWorkouts.filter(ele => 
      ele.roomName === roomName && 
      ele.dayOfWeek === dayOfWeek &&
      ele._id.toString() !== id.toString() 
    );

   
    for (const ele of conflicts) {
      const existingMinutes = getMinutesFromStartOfDay(ele.time);
      const diff = Math.abs(newWorkoutMinutes - existingMinutes);

      if (diff < 60) {
        throw new Error(`Conflict: Room ${roomName} is busy on ${dayOfWeek} at ${ele.time}`);
      }
    }

   
    return await CatalogWorkout.findByIdAndUpdate(id, data, { 
      new: true, 
      runValidators: true 
    });

  } catch (error) {
    // זריקת השגיאה הלאה לקונטרולר
    throw error; 
  }
};
// מחיקת אימון קטלוג
export const deleteCatalogWorkoutById = async (id) => {
  try {
    return await CatalogWorkout.findByIdAndDelete(id);
  } catch (error) {
    throw new Error("Could not delete catalog workout: " + error.message);
  }
};

// אתחול הקטלוג מקובץ JSON
export const resetCatalogFromFile = async () => {
  try {
    const rawData = fs.readFileSync("./json/catalogWorkouts.json", "utf-8");
    const catalogData = JSON.parse(rawData);

    for (let i = 0; i < catalogData.length; i++) {
      const current = catalogData[i];
      
      // בדיקת כפילויות בתוך הקובץ עצמו לפני ההכנסה
      for (let j = i + 1; j < catalogData.length; j++) {
        const other = catalogData[j];
        
        if (current.dayOfWeek === other.dayOfWeek && current.roomName === other.roomName) {
          const time1 = getMinutesFromStartOfDay(current.time);
          const time2 = getMinutesFromStartOfDay(other.time);
          
          if (Math.abs(time1 - time2) < 60) {
            throw new Error(`File Conflict: "${current.workoutName}" and "${other.workoutName}" overlap!`);
          }
        }
      }
    }

    await CatalogWorkout.deleteMany({});
    return await CatalogWorkout.insertMany(catalogData);
    
  } catch (error) {
    throw new Error("Could not reset catalog: " + error.message);
  }
};