import mongoose from "mongoose";
const ROOM_CAPACITIES = {
    'A': 10,
    'B': 15,
    'C': 20,
    'D': 25
};
const CatalogWorkoutSchema = new mongoose.Schema({
    workoutName: { type: String, required: true },
    roomName: { 
        type: String, 
        required: true, 
        enum: ['A', 'B', 'C', 'D'],
        uppercase: true 
    },
   maxParticipants: { 
        type: Number,
        default: function() {
            return ROOM_CAPACITIES[this.roomName];
        }
    }, 
    dayOfWeek: { 
        type: String, 
        required: true, 
        enum: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    },
    coach: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', // השם של מודל המשתמשים שלך
        required: true 
    },
    time: { type: String, required: true }
}, { timestamps: true });
// אינדקס למניעת כפילויות (אופציונלי): 
// מונע מצב שבו משבצים שני אימונים באותו חדר, באותה שעה ובאותו יום
CatalogWorkoutSchema.index({ dayOfWeek: 1, time: 1, roomName: 1 }, { unique: true });

// 3. יצירת המודל עם הסכימה שהגדרת
const CatalogWorkout = mongoose.model("CatalogWorkout", CatalogWorkoutSchema);

export default CatalogWorkout;