import fs from "fs";
import Registration from "../models/registrationModel.js";
import User from "../models/userModel.js";
import Workout from "../models/workoutModel.js";
import{getCurrentWeekRange} from "../utils/dateUtil.js"

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
//קבלת כל רישומי האימונים של משתמש מסויים
export const getRegistrationsByUser = async (userId) => {
    try {
        
        const registrations = await Registration.find({ user: userId })
            .populate("workout"); //פרטי האימון

        return registrations; 
    } catch (error) {
        throw new Error("Error finding user registrations: " + error.message);
    }
};
//קבלת כל הרישומים של אימון מסויים
export const getRegistrationsByWorkout = async (workoutId) => {
    try {
      
        const registrations = await Registration.find({ workout: workoutId })
            .populate("user", "name email phone") // פרטים נוספים 
            .exec();

        return registrations; 
    } catch (error) {
        throw new Error("Error " + error.message);
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





export const resetRegistrationsFromFile = async () => {
    try {
        const rawData = fs.readFileSync("./json/registration.json", "utf-8");
        const registrationsData = JSON.parse(rawData);
        
    
        for (const reg of registrationsData) {
        
            const userExists = await User.findById(reg.user);
            
            if (!userExists) {
                throw new Error(`User with ID ${reg.user} not found in database. Reset aborted.`);
            }

       
            const workoutExists = await Workout.findById(reg.workout);
           
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


/**
 * פונקציה שמחזירה את כמות הנרשמים לאימון ספציפי
 */
export const getCountParticipantsByWorkout = async (workoutId) => {
    try {
        //תספור לי את מספר הרשומים לאימון הספציפי
        const count = await Registration.countDocuments({ workout: workoutId,status: "Registered" });
        return count;
    } catch (error) {
        throw new Error("Could not count participants: " + error.message);
    }
};
export const createRegistration = async (data) => {
    try {
        let registrationStatus = "Registered";
        // המשתמש עם פרטי המנוי 
        const user = await User.findById(data.user).populate('plan');
        if (!user) throw new Error("User not found");

        // נתוני האימון
        const workout = await Workout.findById(data.workout);
        if (!workout) throw new Error("Workout not found");
//אם האימון מלא עדכון סטטוס הרישום לרשימת המתנה
        const currentWorkoutParticipants = await getCountParticipantsByWorkout(data.workout);
        if (currentWorkoutParticipants >= workout.maxParticipants) {
          registrationStatus = "Waitlist";
        }

       //תחילת השבוע וסוף השבוע לפי האימון שנבחר
   const { startOfWeek, endOfWeek } = getCurrentWeekRange(workout.date);
       
    //מציאת כל האימונים של אותו יוזר
        const userRegistrationsThisWeek = await Registration.find({
            user: data.user
        }).populate('workout');
        //ספירת האימונים שעשה במהלך השבוע

        const weeklyCount = userRegistrationsThisWeek.filter(reg => {
            //string to date obj
            const workoutDate = new Date(reg.workout?.date);
            return workoutDate >= startOfWeek && workoutDate <= endOfWeek;
        }).length;

      //לוגיקת מגבלת אימונים
         let limitNumber = 0; 
      if (user.role === "trainer") {
      const limitString = user.plan?.name; 
     
     
    if (limitString === "2xWeek") {
        limitNumber = 2;
    } else if (limitString === "4xWeek") {
        limitNumber = 4;
    } else if (limitString === "Unlimited") {
        limitNumber = null; // ללא הגבלה
    }
   
} else {
    
    limitNumber = null; 
}


        if (limitNumber !== null&&weeklyCount >= limitNumber) {
            throw new Error(`You have reached your weekly limit of ${limitNumber} workouts`);
        }

        // יצירת הרישום
       const registration = new Registration({ ...data, status: registrationStatus });
       const savedRegistration = await registration.save();

// שליפה הרישום עם נתונים נוספים
        return await Registration.findById(savedRegistration._id).populate('workout');
        
    } catch (error) {
        if (error.code === 11000) {
            throw new Error("You are already registered for this workout");
        }
        throw error;
    }
};
export const deleteRegistrationById = async (id) => {
    try {
        //מציאת הרישום לביטול והוצאת פרטי העובד
        const registration = await Registration.findById(id).populate('workout');
        if (!registration) throw new Error("Registration not found");
        
if (!registration.workout) {
    throw new Error("Workout details not found for this registration");
}

        //בדיקת זמן: האם יש יותר מ-24 שעות עד האימון
        const now = new Date();
       
        const workoutDate = new Date(registration.workout.date);

if (registration.workout.time) {
    const [hours, minutes] = registration.workout.time.split(':');
    workoutDate.setHours(parseInt(hours), parseInt(minutes), 0);
}
        
        // חישוב ההפרש במילישניות
        const diffInMs = workoutDate - now;
        const diffInHours = diffInMs / (1000 * 60 * 60);

        if (diffInHours < 24) {
            throw new Error("Cannot cancel less than 24 hours before the workout");
        }

        //  מחיקת ההרשמה הנוכחית
        const workoutId = registration.workout._id;
        await Registration.findByIdAndDelete(id);

        //מיון לפי זמן יצירה והכנסת המשתמש הראשון שנרשם לרישמת ההמתנה לאימון
        const nextInLine = await Registration.findOne({
            workout: workoutId,
            status: 'Waitlist'
        }).sort({ createdAt: 1 }); 

        if (nextInLine) {
            nextInLine.status = 'Registered';
            await nextInLine.save();
        }

        return { message: "Cancelled successfully", promotedFromWaitlist: !!nextInLine };

    } catch (error) {
        throw new Error("Cancellation failed: " + error.message);
    }
};