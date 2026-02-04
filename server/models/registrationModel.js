// models/Registration.js
import mongoose from "mongoose";

const registrationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    workout: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Workout",
      required: true
    },
    status: {
      type: String,
      enum: ["Registered", "Waitlist", "Cancelled"],
      default: "Registered"
    }
  },
  { timestamps: true }
);

// מונע רישום כפול של אותה משתמשת לאותו אימון
registrationSchema.index({ user: 1, workout: 1 }, { unique: true });

const Registration = mongoose.model("Registration", registrationSchema);
export default Registration;