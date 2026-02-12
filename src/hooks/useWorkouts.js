import { useQuery } from "@tanstack/react-query";
import { handleWorkouts } from "../api/workoutsApi.js";


// ההוק המותאם אישית
export const useWorkouts = () => {
  return useQuery({
    queryKey: ["All-workouts"], 
    queryFn: handleWorkouts,  
    staleTime:1000 * 60 * 5, 
  });
};