import {  resetWorkoutsFromCatalog } from "./api/workoutsApi.js";
import { ShopContext } from "./ShopContext.js";
import { createBrowserRouter, RouterProvider } from "react-router";
import App from "./App.jsx";

import { useEffect, useState } from "react";
import { getWorkoutsForThisWeekApi } from "./api/workoutsApi.js";
import { groupWorkoutsByDay } from "./utils/workoutsUtils.js";
import { getAllRegistrationsOfUserApi } from "./api/registrationApi.js";
import { PlansCardsPage } from "./pages/PlansCardsPage.jsx";
import { getAllPlansApi } from "./api/planApi.js";
import { useWorkouts,useNextSevenDaysWorkouts } from "./hooks/useWorkouts.js";
import {AdminRegistration} from "./pages/AdminRegistration.jsx";
import { AdminCatalogWorkouts } from "./pages/AdminCatalogWorkouts.jsx";
import { AdminWorkouts } from "./pages/AdminWorkouts.jsx";

import AdminUsers from "./pages/AdminUsers.jsx";
import HomePage from "./pages/HomePage.jsx";
import { getUserByTokenApi } from "./api/userApi.js";
import { RootLayout } from "./components/RootLayout/RootLayout.jsx";

 const router = createBrowserRouter([
 
  {
    path: "/",
    element: <RootLayout/>, // העטיפה עם ה-Navbar
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/plansCards",
        element: <PlansCardsPage />,
      },
      {
        path: "/admin/registrations",
        element: <AdminRegistration />,
      },
      {
        path: "/admin/catalogWorkouts",
        element: <AdminCatalogWorkouts />,
      },
      {
        path: "/admin/workouts",
        element: <AdminWorkouts />,
      },
      {
        path: "/admin/users",
        element: <AdminUsers />,
      },
      {
        path: "/schedule",
        element: <App />,
      },
    ],
  },
 
]);
export const Router=()=>{
const [workouts, setWorkouts] = useState([]);
const [plans, setplans] = useState([]);
const [user, setUser] = useState(null);
const [userRegistrations, setUserRegistrations] = useState([]);
 const [filter, setFilter] = useState("all");

useEffect(() => {
resetWorkoutsFromCatalog(); 
  }, []); 

   const { data: allWorkouts = [] } = useWorkouts();
  const { data: upcomingWorkouts = [] } = useNextSevenDaysWorkouts(filter,userRegistrations); 

  ///


useEffect(() => {
    const loadData = async () => {
        try {
            // 1. מביאים את הנתונים הגולמיים
            const rawData = await getWorkoutsForThisWeekApi();
              const plansData = await getAllPlansApi();
              setplans(plansData);
             console.log("נתונים גולמיים מהשרת:", plans);

            // 2. מעבדים אותם (Grouping) מיד על המשתנה המקומי
            const grouped = groupWorkoutsByDay(rawData);
          //  console.log("נתונים לאחר קבוץ:", grouped);

            // 3. שומרים ב-State את התוצאה הסופית
            setWorkouts(grouped);
            
        } catch (error) {
            console.error("Failed to fetch:", error);
        }
    };

    loadData();
}, []); // נשאר ריק כדי שירוץ רק פעם אחת בטעינה

 
    ////////


useEffect(() => {
  setFilter("all");
}, [user]);
useEffect(() => {
        const loadData = async () => {
            // רק אם יש יוזר מחובר, נשלוף את הרישומים שלו
            if (user && user._id) {
                try {
                    const regs = await getAllRegistrationsOfUserApi(user._id);
                    setUserRegistrations(regs);
                    console.log("userRegistrations:",userRegistrations);
                } catch (err) {
                    console.error("Failed to load registrations on refresh", err);
                }
            }
        };

        loadData();
    }, [user]);

useEffect(() => {
    const checkAuth = async () => {
        try {
            const userData = await getUserByTokenApi();
            if (userData) {
                setUser(userData); // מעדכן את ה-State והאפליקציה מזהה את המשתמש
            }
        } catch (err) {
            console.error("Auto-login failed:", err.message);
            setUser(null);
        }
    };

    checkAuth();
}, []); // ירוץ רק פעם אחת בטעינת הדף
return ( <ShopContext.Provider
     value={{ 
      workouts:/*  workouts */upcomingWorkouts, 
      setFilter:setFilter,
      filter: filter,
      user: user, 
      setUser: setUser,
      userRegistrations:userRegistrations,
      setUserRegistrations:setUserRegistrations,
      plans:plans,
  

    }}>
<RouterProvider router={router} /> 
</ShopContext.Provider>);
};
