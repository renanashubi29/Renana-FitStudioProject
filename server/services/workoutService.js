import fs from "fs";
import Workout from "../models/workoutModel.js";
import { extractTimeFromDate, getDateToString, getMinutesFromStartOfDay,getNextDateByDayName } from "../utils/dateUtil.js";
import CatalogWorkout from "../models/catalogWorkoutModel.js";


// קבלת כל האימונים
export const getAllWorkouts = async () => {
  try {
    return await Workout.find({}).populate('coach');
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
    //  בדיקה אם בכלל יש נתונים
    if (!data.time || !data.date || !data.roomName) {
        throw new Error("Missing required fields: time, date, or roomName");
    }

    // כל האימונים שבאותו החדר
    const existingWorkouts = await Workout.find({
      roomName: data.roomName
    });

    
    const targetDate = getDateToString(data.date);
    //סינון נוסף לפי כל האימונים שבאותו תאריך
    
    const conflicts = existingWorkouts.filter(item => 
     getDateToString(item.date) === targetDate
    );

    //בדיקה שניתן להוסיף שלא קיים אימון שמתקיים בטווח של 60 דקות מהאימון להוספה
    const newWorkoutMinutes = getMinutesFromStartOfDay(data.time);

    for (const ele of conflicts) {
      const existingMinutes = getMinutesFromStartOfDay(ele.time);
      const diff = Math.abs(newWorkoutMinutes - existingMinutes);

      if (diff < 60) {
        throw new Error(`Room ${data.roomName} is busy between ${ele.time} and 60 minutes after.`);
      }
    }

    // שמירת האימון 
    const workout = new Workout(data);
    const savedWorkout = await workout.save();
    return savedWorkout;

  } catch (error) {
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
export const updateWorkoutById = async (id, data) => {
  try {

    const currentWorkout = await Workout.findById(id);
    if (!currentWorkout) throw new Error("Workout not found");

   
    const roomName = data.roomName || currentWorkout.roomName;
    const date = data.date || currentWorkout.date;
    const time = data.time || currentWorkout.time;

   
    const targetDate = getDateToString(date);
    const newWorkoutMinutes = getMinutesFromStartOfDay(time);

  
    const allWorkouts = await getAllWorkouts();
    
    // תיתן לי כל האימונים בחדר שלי באותו היום חוץ מעצמי
    const conflicts = allWorkouts.filter(ele => 
      ele.roomName === roomName && 
      getDateToString(ele.date) === targetDate &&
      ele._id.toString() !== id.toString() 
    );

   //בדיקה שהפרשי הזמן של כל שאר האימונים גדולים מ60
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
    const data = fs.readFileSync("./json/workouts.json", "utf-8");
    const workoutsData = JSON.parse(data);

    for (const workout of workoutsData) {
      // סינון אימונים באותו אולם, באותו תאריך, ושזה לא האימון עצמו
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
/* //הכנסה לרשימת האימונים אימונים מהקטלוג שלא קיימים
 export const resetWorkoutsFromCatalog = async () => {
  //קבלת כל אימוני הקטלוג
    const catalogItems = await CatalogWorkout.find({});
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    
    const now = new Date();
    const currentTimeStr = extractTimeFromDate(now);

    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();
    const currentDate = now.getDate();
    //מערך לשמירת האימונים שנוספו מהקטלוג לאימונים הפעילים
    const createdWorkouts = [];

    //מעבר על כל ימי השבוע -יום שהתחיל יפתח ההרשמה לשבוע הבא
    for (let i = 0; i < 8; i++) {
        // יצירת תאריך UTC נקי
        const targetDate = new Date(Date.UTC(currentYear, currentMonth, currentDate + i, 0, 0, 0, 0));
        const dayName = daysOfWeek[targetDate.getUTCDay()];
        //תיתן לי את כל אימוני הקטלוג של אותו היום במעבר על הלולאה

        let relevantItems = catalogItems.filter(item => item.dayOfWeek === dayName);

        
        //אם זה היום הנוכחי יש צורך בסינון לפי השעה-הצגת רק האימונים שאחרי השעה
        if (i === 0) {
            relevantItems = relevantItems.filter(item => item.time > currentTimeStr);
        } 
        //אם זה היום האחרון יש צורך להציג רק את האימונים שלפני השעה הנוכחית
        else if (i === 7) {
            relevantItems = relevantItems.filter(item => item.time <= currentTimeStr);
        }
      
//מעבר על כל אימוני הקטלוג של אותו היום ובדיקה האם הם קיימים באימונים הפעילים
        for (const item of relevantItems) {
            const existing = await Workout.findOne({
              catalogWorkoutCode: item.workoutCode,
              date: targetDate
            });
//אם לא חזר לי אובייקט אז אני צריכה להוסיף מהקטלוג לאימונים הפעילים
            if (!existing) {
                const newWorkout = new Workout({
                   catalogWorkoutCode:item.workoutCode,
                    workoutName: item.workoutName,
                    roomName: item.roomName,
                    date: targetDate,
                    time: item.time,
                    coach: item.coach,
                    maxParticipants: item.maxParticipants
                });
                //שמירה בDB
                const saved = await newWorkout.save();
                createdWorkouts.push(saved);
            }
        }
    }
    return createdWorkouts;
} */
/* export const resetWorkoutsFromCatalog = async () => {
  //קבלת כל אימוני הקטלוג
   const allWorkouts = await Workout.find({});
    const allCatalogWorkouts = await CatalogWorkout.find({});
    const now = new Date();

// 2. יצירת תאריך של "היום" בשעה 00:00:00 (בפורמט UTC)
const startDate = new Date(Date.UTC(
    now.getUTCFullYear(), 
    now.getUTCMonth(), 
    now.getUTCDate(), 
    0, 0, 0, 0
));

// 3. יצירת תאריך של "עוד שבוע" (היום + 7 ימים) באותה שעה
const endDate = new Date(startDate); // מעתיקים את תאריך ההתחלה
endDate.setUTCDate(startDate.getUTCDate() + 7); // מוסיפים 7 ימים

// בדיקה של התוצאות בפורמט ISO (הפורמט שביקשת)
console.log("Start Date:", startDate.toISOString()); 
// פלט לדוגמה: 2026-03-12T00:00:00.000Z

console.log("End Date:", endDate.toISOString());
// פלט לדוגמה: 2026-03-19T00:00:00.000Z
let workoutsItems = allWorkouts.filter(item => {
    const itemDateNumber = new Date(item.date).getTime();
    return itemDateNumber >= startDate && itemDateNumber <= endDate;
});
for (const item of workoutsItems) {
  const currentTimeStr = extractTimeFromDate(new Date());
 console.log(currentTimeStr); // למשל: "17:30"
  const itemDateNumber = new Date(item.date).getTime();
  if(itemDateNumber===startDate)
 workoutsItems = workoutsItems.filter(item => {
    return item.time>currentTimeStr;
});
 
  if(itemDateNumber===endDate)
 workoutsItems = workoutsItems.filter(item => {
    return item.time<=currentTimeStr;
});

}
for (const item of allCatalogWorkouts)
{
 const found = workoutsItems.find(ele=>ele.catalogWorkoutCode===item.workoutCode)
if (!found) {
        // כאן את יוצרת את האימון החדש
        const newWorkout = new Workout({
            catalogWorkoutCode: item.workoutCode,
            workoutName: item.workoutName,
            roomName: item.roomName,
            date: getNextDateByDayName(item.dayOfWeek), 
            time: item.time,
            coach: item.coach,
            maxParticipants: item.maxParticipants
        });

        // 3. שמירה בבסיס הנתונים
        const saved = await newWorkout.save();
        
        // 4. עדכון המערך המקומי כדי שלא ניצור אותו שוב בטעות באותה ריצה
        workoutsItems.push(saved);
        
        // (אופציונלי) שמירה במערך שאת מחזירה בסוף הפונקציה
        createdWorkouts.push(saved);
    }
}

} */
export const resetWorkoutsFromCatalog = async () => {
    console.log("--- Starting resetWorkoutsFromCatalog ---");

    const allWorkouts = await Workout.find({});
    const allCatalogWorkouts = await CatalogWorkout.find({});
    console.log(`Fetched ${allWorkouts.length} active workouts and ${allCatalogWorkouts.length} catalog items.`);

    const now = new Date();
    const startDate = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 0, 0, 0, 0));
    const endDate = new Date(startDate);
    endDate.setUTCDate(startDate.getUTCDate() + 7);

    console.log("Search Window:", startDate.toISOString(), "to", endDate.toISOString());

    // 1. פילטור ראשוני לפי תאריכים
    let workoutsItems = allWorkouts.filter(item => {
        const itemDateNumber = new Date(item.date).getTime();
        return itemDateNumber >= startDate.getTime() && itemDateNumber <= endDate.getTime();
    });
    console.log(`Workouts found in this week's window: ${workoutsItems.length}`);

    // 2. פילטור שעות (היום והיום השמיני) - עושים את זה פעם אחת, לא בתוך לולאה
    const currentTimeStr = extractTimeFromDate(now);
    console.log(`Current Time for filtering: ${currentTimeStr}`);

    workoutsItems = workoutsItems.filter(item => {
        const itemDateNumber = new Date(item.date).getTime();
        
        // אם זה היום - תשאיר רק מה שבעתיד
        if (itemDateNumber === startDate.getTime()) {
            return item.time > currentTimeStr;
        }
        // אם זה היום השמיני - תשאיר רק מה שלפני השעה הנוכחית
        if (itemDateNumber === endDate.getTime()) {
            return item.time <= currentTimeStr;
        }
        // כל שאר הימים - תשאיר הכל
        return true;
    });
    console.log(`Workouts items after time filtering: ${workoutsItems.length}`);

    const createdWorkouts = [];

    // 3. מעבר על הקטלוג
    for (const item of allCatalogWorkouts) {
        const targetDate = getNextDateByDayName(item.dayOfWeek,item.time);
        const targetDateTime = targetDate.getTime();

        console.log(`Checking catalog item: ${item.workoutName} (${item.dayOfWeek} ${item.time})`);

        // בדיקה: האם האימון כבר קיים בתאריך הספציפי הזה?
        const found = workoutsItems.find(ele => 
            ele.catalogWorkoutCode === item.workoutCode 
        );

        if (!found) {
            console.log(`>>> Missing! Creating ${item.workoutName} for ${targetDate.toISOString().split('T')[0]}`);
            
            try {
                const newWorkout = new Workout({
                    catalogWorkoutCode: item.workoutCode,
                    workoutName: item.workoutName,
                    roomName: item.roomName,
                    date: targetDate,
                    time: item.time,
                    coach: item.coach,
                    maxParticipants: item.maxParticipants
                });

                const saved = await newWorkout.save();
                workoutsItems.push(saved);
                createdWorkouts.push(saved);
            } catch (err) {
                console.error(`Error saving workout ${item.workoutName}:`, err.message);
            }
        } else {
            console.log(`Already exists: ${item.workoutName} on ${targetDate.toISOString().split('T')[0]}`);
        }
    }

    console.log(`--- Process Finished. Created ${createdWorkouts.length} new workouts. ---`);
    return createdWorkouts;
};

//החזרת כל האימונים להצגה
export const getWorkoutsForNextSevenDays = async () => {
  try {
   
   const allWorkouts = await Workout.find({})
      .populate('coach') 
      .sort({ date: 1, time: 1 });

    // היום הנוכחי
    const now = new Date();
    const currentTime = extractTimeFromDate(now);
    console.log("current time:",currentTime);
    const todayStr = getDateToString(now);
//היום האחרון שנפתח
    const nextWeek = new Date();
    nextWeek.setDate(now.getDate() + 7);
    const nextWeekStr = getDateToString(nextWeek);

    //תסנן לי לפי פונקציית הסינון
    return allWorkouts.filter(workout => {
      const workoutDateStr = getDateToString(workout.date);

      // בדיקה אם התאריך בטווח 7 הימים
      if (workoutDateStr < todayStr || workoutDateStr > nextWeekStr) {
        return false;
      }

      // סינון שעות ביום הראשון
      if (workoutDateStr === todayStr) {
        return workout.time >= currentTime;
      }

      // סינון שעות ביום השביעי
      if (workoutDateStr === nextWeekStr) {
        return workout.time <= currentTime;
      }

      return true; // כל מה שבאמצע
    });//סיום פילטור והגדרה איך לסנן

  } catch (error) {
    throw new Error("Failed to fetch and filter: " + error.message);
  }
};