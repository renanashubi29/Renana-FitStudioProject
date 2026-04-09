
import { WorkoutCardComp } from "../WorkoutCard/WorkoutCardComp";
import './DayGroupWorkouts.css';
export const DayGroupWorkouts = (props) => {
  return (
    <div className="day-group">
     
      <h1>{props.dayName}</h1>
      <div className="cards-flex">
        {/* ריצה על מערך האימונים הספציפי ליום הזה */}
        {props.workoutsInDay.map((workout) => (
          <WorkoutCardComp
            key={workout._id}
            id={workout._id}
            workoutName={workout.workoutName}
            roomName={workout.roomName}
            maxParticipants={workout.maxParticipants}
            coach={workout.coach?.name}
            date={workout.date}
            time={workout.time}
          />
        ))}
      </div>
    </div>
  );
};