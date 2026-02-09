import fs from "fs";
import Workout from "../models/workoutModel.js";
import { getMinutesFromStartOfDay } from "../utils/dateUtil.js";


// קבלת כל האימונים
export const getAllWorkouts = async () => {
  try {
    return await Workout.find({});
  } catch (error) {
    throw new Error("Could not fetch workouts: " + error.message);
  }
};

// קבלת אימון לפי ID
export const getWorkoutById = async (id) => {
  try {
    return await Workout.findById(id);
  } catch (error) {
    throw new Error("Could not find workout: " + error.message);
  }
};

// יצירת אימון חדש
export const createWorkout = async (data) => {
  try {
    // 2. בדיקה אם בכלל יש נתונים
    if (!data.time || !data.date || !data.roomName) {
        throw new Error("Missing required fields: time, date, or roomName");
    }

    // 3. שליפת אימונים רלוונטיים בלבד (חוסך ביצועים ושגיאות)
    const existingWorkouts = await Workout.find({
      roomName: data.roomName
    });

    // 4. סינון לפי תאריך ב-JS (למקרה שהפורמט ב-DB שונה מעט)
    const targetDate = new Date(data.date).toISOString().split('T')[0];
    
    const conflicts = existingWorkouts.filter(item => 
      item.date.toISOString().split('T')[0] === targetDate
    );

    // 5. בדיקת חפיפה
    const newWorkoutMinutes = getMinutesFromStartOfDay(data.time);

    for (const ele of conflicts) {
      const existingMinutes = getMinutesFromStartOfDay(ele.time);
      const diff = Math.abs(newWorkoutMinutes - existingMinutes);

      if (diff < 60) {
        throw new Error(`Room ${data.roomName} is busy between ${ele.time} and 60 minutes after.`);
      }
    }

    // 6. יצירה ושמירה
    const workout = new Workout(data);
    const savedWorkout = await workout.save();
    return savedWorkout;

  } catch (error) {
    // חשוב מאוד: זורקים את השגיאה המקורית כדי שהקונטרולר יתפוס אותה
    throw error; 
  }
};

// מחיקת אימון
export const deleteWorkoutById = async (id) => {
  try {
    return await Workout.findByIdAndDelete(id);
  } catch (error) {
    throw new Error("Could not delete workout: " + error.message);
  }
};

// עדכון אימון
// עדכון אימון
export const updateWorkoutById = async (id, data) => {
  try {

    const currentWorkout = await Workout.findById(id);
    if (!currentWorkout) throw new Error("Workout not found");

   
    const roomName = data.roomName || currentWorkout.roomName;
    const date = data.date || currentWorkout.date;
    const time = data.time || currentWorkout.time;

   
    const targetDate = new Date(date).toISOString().split('T')[0];
    const newWorkoutMinutes = getMinutesFromStartOfDay(time);

  
    const allWorkouts = await getAllWorkouts();
    
    // סינון: רק אימונים באותו חדר, באותו יום, ושזה לא האימון שאנחנו מעדכנים עכשיו
    const conflicts = allWorkouts.filter(ele => 
      ele.roomName === roomName && 
      ele.date.toISOString().split('T')[0] === targetDate &&
      ele._id.toString() !== id.toString() // מוודא שלא בודקים חפיפה עם עצמנו
    );

   
    for (const ele of conflicts) {
      const existingMinutes = getMinutesFromStartOfDay(ele.time);
      const diff = Math.abs(newWorkoutMinutes - existingMinutes);

      if (diff < 60) {
        throw new Error(`Conflict: Room ${roomName} is busy at ${ele.time}`);
      }
    }

 
    return await Workout.findByIdAndUpdate(id, data, { new: true, runValidators: true });

  } catch (error) {
    throw error;
  }
};

export const resetWorkoutsFromFile = async () => {
  try {
    const data = fs.readFileSync("./server/json/workouts.json", "utf-8");
    const workoutsData = JSON.parse(data);

    for (const workout of workoutsData) {
      // 1. מסננים אימונים באותו אולם, באותו תאריך, ושזה לא האימון עצמו
      const conflicts = workoutsData.filter((item) => 
        item.roomName === workout.roomName && 
        item.date === workout.date && 
        item !== workout
      );

      for (const ele of conflicts) {
        const time1 = getMinutesFromStartOfDay(workout.time);
        const time2 = getMinutesFromStartOfDay(ele.time);
        
      
        const diff = Math.abs(time1 - time2);

     
        if (diff < 60) {
          throw new Error(
            `Conflict: Workout "${workout.workoutName}" and "${ele.workoutName}" in Room ${workout.roomName} are too close!`
          );
        }
      }
    }

  
    await Workout.deleteMany({});
    return await Workout.insertMany(workoutsData);
    
  } catch (error) {
    throw new Error("Could not reset workouts: " + error.message);
  }
};