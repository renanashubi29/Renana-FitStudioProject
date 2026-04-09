
import React, { useContext } from "react";
import { ShopContext } from "../../../ShopContext";
import { WorkoutsFilterButtons } from "../WorkoutsFilterButtons/WorkoutsFilterButtons";
import { DayGroupWorkouts } from "../DayGroupWorkouts/DayGroupWorkouts";
import './WorkoutsSection.css';

const getDayName = (dayIndex) => {
  const date = new Date();
  date.setDate(date.getDate() + dayIndex);
  return new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(date);
};

export const WorkoutsSection = () => {
  const { workouts } = useContext(ShopContext);


  return (
    <>
   <div className="container">
      <WorkoutsFilterButtons />

      <section className="workouts">
        {workouts.map((workoutsInSpecificDay, dayIndex) => {
          const dayName = getDayName(dayIndex);

          // סינון ימי שבת או ימים ללא אימונים
          if (dayName === "Saturday" || workoutsInSpecificDay.length === 0) {
            return null;
          }

          return (
            <DayGroupWorkouts 
              key={dayIndex} 
              dayName={dayName} 
              workoutsInDay={workoutsInSpecificDay} 
            />
          );
        })}
      </section>
      </div>
    </>
  );
};