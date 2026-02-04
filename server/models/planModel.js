import mongoose from "mongoose";

const planSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    enum: ["2xWeek", "4xWeek", "Unlimited"],
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  duration: {
    type: String,
    required: true,
    enum: ["month", "year"]
  }
}, { timestamps: true });

const Plan = mongoose.model("Plan", planSchema);

export default Plan;
