import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";


export const ScheduleCardComp=()=> {
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
          18:15 - 19:00 | 02/02 שני
        </div>
      </div>

      <h2 className="title">BODY CORE</h2>

      <p className="subtitle">
        שחר דולב / סטודיו A
      </p>

      <button className="register-btn">
        הרשמה
      </button>
    </div>
  );
}
