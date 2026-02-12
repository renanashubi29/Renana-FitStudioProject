import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";


export const ScheduleCardComp= (props) =>  {
  const getDayName = (dateString) => {
    const date = new Date(dateString);
    // 'short' יחזיר "יום א'" או "א'", 'long' יחזיר "יום ראשון"
    return date.toLocaleDateString('he-IL', { weekday: 'long' });
  };
  const [liked, setLiked] = useState(false);

  return (
    <div className="class-card">
      <div className="card-header">
        <IconButton
          onClick={() => setLiked(!liked)}
          size="small"
          aria-label="favorite"
        >
          {liked ? (
            <FavoriteIcon sx={{ color: "#e53935" }} />
          ) : (
            <FavoriteBorderIcon sx={{ color: "#e53935" }} />
          )}
        </IconButton>

        <div className="time">
      {props.time} - {`${(parseInt(props.time?.split(':')[0]) + 1).toString().padStart(2, '0')}:${props.time?.split(':')[1]}`} | {props.date?.split('T')[0]}
      |{getDayName(props.date)}
        </div>
      </div>

      <h2 className="title">
        {props.workoutName}
      </h2>

      <p className="subtitle">
       אולם:{props.roomName}
      </p>

      <button className="register-btn">
        הרשמה
      </button>
    </div>
  );
}
