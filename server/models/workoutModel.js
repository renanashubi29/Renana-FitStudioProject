import mongoose from "mongoose";
const ROOM_CAPACITIES = {
    'A': 10,
    'B': 15,
    'C': 20,
    'D': 25,
    'P': 3
};
const workoutSchema = new mongoose.Schema({
    catalogWorkoutCode: { 
        type: Number, 
        required: true 
    },
    workoutName: { type: String, required: true },
    roomName: { 
        type: String, 
        required: true, 
        enum: ['A', 'B', 'C', 'D', 'P'],
        uppercase: true 
    },
   maxParticipants: { 
        type: Number,
        default: function() {
            return ROOM_CAPACITIES[this.roomName];
        }
    },
    coach: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', // השם של מודל המשתמשים שלך
        required: true 
    }, 
    date: { type: Date, required: true },
    time: { type: String, required: true }
}, { timestamps: true });




const Workout = mongoose.model("Workout", workoutSchema);
export default Workout;