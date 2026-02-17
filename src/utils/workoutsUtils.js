export const sortWorkoutsByDateTime = (workouts) => {

  return [...workouts].sort((a, b) => {

    const dateA = new Date(`${a.date.split('T')[0]}T${a.time}`);
    const dateB = new Date(`${b.date.split('T')[0]}T${b.time}`);

   
    return dateA - dateB;
  });
};


export const groupWorkoutsByDay = (workouts) => {
  const schedule = [];
  const now = new Date();

  for (let i = 0; i < 8; i++) {
   
    const targetDate = new Date();
    targetDate.setDate(now.getDate() + i);
    
    //YYYY-MM-DDT...
    const targetDateStr = targetDate.toISOString().split('T')[0];

    // 2. פילטור האימונים ששייכים בדיוק לתאריך הזה
    const dayWorkouts = workouts.filter(workout => {
      const workoutDateStr = new Date(workout.date).toISOString().split('T')[0];
      return workoutDateStr === targetDateStr;
    });

    // מיון האימונים בתוך היום לפי שעה
    const sortedDayWorkouts = sortWorkoutsByDateTime(dayWorkouts);

    schedule[i] = sortedDayWorkouts;
  }

 
  return schedule;
};