import { useQuery } from "@tanstack/react-query";
import { handleWorkouts } from "./api/workoutsApi.js";
import { ShopContext } from "./ShopContext.js";
import { createBrowserRouter, RouterProvider } from "react-router";
import App from "./App.jsx";
 const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
 
]);
export const Router=()=>{

const { data: allWorkouts = [] } = useQuery({
    queryKey: ["all-workouts"],
    queryFn: handleWorkouts,
  });
  console.log("allWorkouts",allWorkouts);
return ( <ShopContext.Provider
      value={{ workouts: allWorkouts }}>
<RouterProvider router={router} /> 
</ShopContext.Provider>);
};
