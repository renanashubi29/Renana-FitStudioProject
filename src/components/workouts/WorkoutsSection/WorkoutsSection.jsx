
import { useContext } from "react";
import { WorkoutCardComp } from "../WorkoutCard/WorkoutCardComp";
import { ShopContext } from "../../../ShopContext";

// פונקציית עזר לקבלת שם היום באנגלית
const getDayName = (dayIndex) => {
  const date = new Date();
  date.setDate(date.getDate() + dayIndex);

  // שימוש ב-Intl מאפשר לקבל את שם היום לפי השפה שנבחר (en-US)
  return new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(date);
};

export const WorkoutsSection = () => {
  const { workouts } = useContext(ShopContext);

  return (
    <section className="workouts">
      {workouts.map((workoutsInSpecificDay, dayIndex) => {
        const dayName = getDayName(dayIndex);
        
        // לוגיקה מעודכנת: מציג רק אם זה לא שבת ואם יש אימונים ביום הזה
        return (
          dayName !== "Saturday" &&  workoutsInSpecificDay.length > 0 && (
            <div key={dayIndex} className="day-group">
              <h1>{dayName}</h1>
              <div className="cards-grid">
                {workoutsInSpecificDay.map((workout) => (
                  <WorkoutCardComp
                    key={workout._id} 
                    id={workout._id}
                    workoutName={workout.workoutName}
                    roomName={workout.roomName}
                    maxParticipants={workout.maxParticipants}
                    date={workout.date}
                    time={workout.time}
                  />
                ))}
              </div>
            </div>
          )
        );
      })}
    </section>
  );
};