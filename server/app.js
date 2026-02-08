 import express from "express";

import cors from "cors";
import { connectedDB } from "./DB/db.js";
import dotenv from "dotenv";
import path from "path"; 
import User from "./models/userModel.js";
import userRoutes from "./routes/userRoutes.js";
import planRoutes from "./routes/planRoutes.js";
import registrationRoutes from "./routes/registrationRoutes.js";
import workoutRoutes from "./routes/workoutRoutes.js";

dotenv.config();
const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors());
app.use("/api/users", userRoutes);
app.use("/api/plans", planRoutes);
app.use("/api/workouts", workoutRoutes);
app.use("/api/registrations", registrationRoutes);
const startServer=async()=>{
  await connectedDB(process.env.MONGO_URI);
  app.listen(port,()=>{
    console.log(`Server running at port ${port}`);
  });
};
startServer(); 



