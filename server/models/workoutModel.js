import mongoose from "mongoose";

const workoutSchema = new mongoose.Schema({
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
            const capacities = { 'A': 10, 'B': 15, 'C': 20, 'D': 25 };
            return capacities[this.roomName];
        }
    }, 
    date: { type: Date, required: true },
    time: { type: String, required: true }
}, { timestamps: true });




const Workout = mongoose.model("Workout", workoutSchema);
export default Workout;