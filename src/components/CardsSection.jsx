import { useContext } from "react";
import { ScheduleCardComp } from "./ScheduleCardComp";
import { ShopContext } from "../ShopContext";

export const CardsSection = () => {
  const { workouts } = useContext(ShopContext);
  console.log("comp",workouts);

  return (
    <section className="workouts">
      {workouts.map((workout) => (
        <ScheduleCardComp
          workoutName={workout.workoutName}
          roomName={workout.roomName}
          maxParticipants={workout.maxParticipants}
          date={workout.date}
          time={workout.time}
        />
      ))}
    </section>
  );
};