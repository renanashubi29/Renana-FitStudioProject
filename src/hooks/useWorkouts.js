import { useQuery } from "@tanstack/react-query";
import { fetchNextSevenDaysWorkouts, handleWorkouts } from "../api/workoutsApi.js";
import { groupWorkoutsByDay } from "../utils/workoutsUtils.js";



export const useWorkouts = () => {
  return useQuery({
    queryKey: ["All-workouts"], 
    queryFn: handleWorkouts,  
    select: (data) =>
    groupWorkoutsByDay(data),
    staleTime: 5 * 60 * 1000, 
  });
};
export const useNextSevenDaysWorkouts = () => {
  return useQuery({
    queryKey: ["workouts", "next-seven-days"], 
    queryFn: fetchNextSevenDaysWorkouts,
    select: (data) =>
        groupWorkoutsByDay(data),
    
    staleTime: 5 * 60 * 1000, // המידע נחשב טרי ל-5 דקות
  });
};