import { useContext, useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { createRegistrationApi, getAllParticipantsInWorkoutApi, deleteRegistrationApi } from "../../../api/registrationApi";
import { ShopContext } from "../../../ShopContext";
import './WorkoutCardComp.css';


export const WorkoutCardComp = (props) => {
  const { userRegistrations, setUserRegistrations, user } = useContext(ShopContext);
  const [participantsCount, setParticipantsCount] = useState(0);
  const [liked, setLiked] = useState(false);
 
  // בדיקה האם המשתמש כבר רשום לאימון הזה
  const registration = userRegistrations?.find((reg) => {
    const regId = String(reg.workout?._id || reg.workout);
    const cardId = String(props.id);
    return regId === cardId;
  });


 // פונקציית הרישום
  const handleRegisterClick = async () => {
    if (!user) {
      alert("Please log in to register for a workout");
      return;
    }

    try {
      const result = await createRegistrationApi(user._id, props.id);
   
setUserRegistrations((prev) => {
  const updated = [...prev, result];
  return updated;
});
      if (result.status === "Registered") {
    setParticipantsCount((prev) => prev + 1);
    alert("Registered successfully! See you there.");
} else {
    alert("You've been added to the Waitlist successfully! ⏳");
}
    } catch (error) {
      alert(error.message);
    }
  };
 const handleCancelClick = async () => {
  if (!user) {
    alert("Please log in to manage your registrations");
    return;
  }

  // מכיוון שאנחנו בתוך הכרטיסייה, יש לנו כבר את אובייקט ה-registration
  if (!registration) return;

  if (!window.confirm("Are you sure you want to cancel?")) return;

  try {
    console.log(registration._id);
    // 1. קריאה ל-API (משתמשים ב-ID של הרישום שמצאנו קודם)
    const result = await deleteRegistrationApi(registration._id);

    // 2. עדכון ה-State הגלובלי (כדי שהכפתור יחזור למצב "Sign Up")
    setUserRegistrations((prev) => prev.filter((reg) => reg._id !== registration._id));

   const updatedParticipants = await getAllParticipantsInWorkoutApi(props.id);
    setParticipantsCount(updatedParticipants.length);

    alert(result.message);

  } catch (error) {
    // כאן תופיע השגיאה במידה ועברו פחות מ-24 שעות
    alert(error.message);
  }
};
//סטטוס כפתור
const isRegistered = registration?.status === "Registered";
const isWaitlisted = registration?.status === "Waitlist";
const isDisabled = isRegistered || isWaitlisted;

  // משיכת כמות הנרשמים מהשרת
  useEffect(() => {
    const getCount = async () => {
      const data = await getAllParticipantsInWorkoutApi(props.id);
      setParticipantsCount(data.length);
    };
    getCount();
  }, [props.id]);

  const isFull = participantsCount >= props.maxParticipants;

  

  // חישוב שעת סיום
  const calculateEndTime = (startTime) => {
    if (!startTime) return "";
    const [hours, minutes] = startTime.split(":");
    const endHour = (parseInt(hours) + 1).toString().padStart(2, "0");
    return `${endHour}:${minutes}`;
  };



  return (
    <div className="class-card">
      <div className="card-header">
        <IconButton
          onClick={() => setLiked(!liked)}
          size="small"
          aria-label="add to favorites"
        >
         {liked ? (
  <FavoriteIcon className="favorite-icon" />
) : (
  <FavoriteBorderIcon className="favorite-icon" />
)}
        </IconButton>
{/* כפתור הביטול - יופיע רק אם המשתמש רשום או בהמתנה */}
    
        <div className="time">
          {props.time} - {calculateEndTime(props.time)} 
        </div>
      </div>

      <h2 className="title">{props.workoutName}</h2>

      <p className="subtitle">Room: {props.roomName}</p>
        <p className="subtitle">{props.coach}</p>
        {/* הוספת שורת התפוסה */}
<p className="participants-count">
  {participantsCount}/{props.maxParticipants}
</p>
      <button
        className="register-btn"
       onClick={handleRegisterClick}
        disabled={isDisabled}
      >
        {isRegistered ? (
          "Registered ✅"
        ) : isFull ? (
          "Join Waitlist ⏳"
        ) : (
          "Sign Up"
        )}
      </button>
 
    {isDisabled && (
      <button
         className="register-btn"
        onClick={handleCancelClick}
        size="small"
      >
        Cancel
      </button>
    )}
     

    </div>
  );
};