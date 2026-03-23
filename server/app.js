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
import CatalogWorkoutRoutes from "./routes/CatalogWorkoutRoutes.js";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// הגדרת נתיב ה-dist
const distPath = path.join(__dirname, "client", "dist");
const indexPath = path.join(distPath, "index.html");

dotenv.config({ path: path.join(__dirname, ".env") });

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

// הגשת קבצים סטטיים מה-dist
app.use(express.static(distPath));

// Routes של ה-API
app.use("/api/users", userRoutes);
app.use("/api/plans", planRoutes);
app.use("/api/workouts", workoutRoutes);
app.use("/api/catalogWorkouts", CatalogWorkoutRoutes);
app.use("/api/registrations", registrationRoutes);

// ניתוב כל שאר הבקשות ל-Frontend
app.get(/^(?!\/api).+/, (req, res) => {
  res.sendFile(indexPath);
});

const startServer = async () => {
  try {
    await connectedDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`🚀 Server running at port ${port}`);
      console.log(`🔗 Access your app at: http://localhost:${port}`);
    });
  } catch (error) {
    console.error("❌ Database connection error:", error);
  }
};

startServer();