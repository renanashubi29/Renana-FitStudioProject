import { useQuery } from "@tanstack/react-query";
import { getWorkoutsForThisWeekApi, getAllWorkoutsApi } from "../api/workoutsApi.js";
import { groupWorkoutsByDay } from "../utils/workoutsUtils.js";
import { getAllRegistrationsOfUserApi } from "../api/registrationApi.js";
import { useContext } from "react";
import { ShopContext } from "../ShopContext.js";



export const useWorkouts = () => {
  return useQuery({
    queryKey: ["All-workouts"], 
    queryFn: getAllWorkoutsApi,  
    select: (data) =>
    groupWorkoutsByDay(data),
    staleTime: 5 * 60 * 1000, 
  });
};
export const useNextSevenDaysWorkouts = (filter, userRegistrations) => {
  // אם ה-Context עדיין מחזיר null, נוסיף הגנה קטנה


  return useQuery({
    queryKey: ["workouts", "next-seven-days"], 
    queryFn: getWorkoutsForThisWeekApi,
    select: (data) => {
      let filtered;
      filtered=data;
    if (filter === "registered" && userRegistrations?.length > 0){
       filtered = userRegistrations.map(reg => { return reg.workout });
      }
     

      return groupWorkoutsByDay(filtered);
    },
    staleTime: 5 * 60 * 1000,
  });
};