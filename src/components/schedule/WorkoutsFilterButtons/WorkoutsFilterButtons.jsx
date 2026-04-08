import React, { useContext } from "react";
import { ShopContext } from "../../../ShopContext";
import './WorkoutsFilterButtons.css';
import { showStudioAlert } from "../../studioAlert/studioAlert";
export const WorkoutsFilterButtons = () => {
  const { filter, setFilter, userRegistrations } = useContext(ShopContext);

  const handleMyScheduleClick = () => {
    // בדיקה האם יש הרשמות לפני שינוי הפילטר
    if (!userRegistrations || userRegistrations.length === 0) {
     showStudioAlert(
    "Stay Active!", 
    "You haven't registered for any workouts yet! 💪", 
    "info"
);
    } else {
      setFilter("registered");
    }
  };

  return (
    <div className="filter-container">
      <button 
        className={`filter-btn ${filter === "all" ? "active" : ""}`} 
        onClick={() => setFilter("all")}
      >
        All Workouts
      </button>
      <button 
        className={`filter-btn ${filter === "registered" ? "active" : ""}`} 
        onClick={handleMyScheduleClick}
      >
        My Schedule
      </button>
    </div>
  );
};