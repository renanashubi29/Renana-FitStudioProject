import { 
  createWorkout, 
  deleteWorkoutById, 
  getAllWorkouts, 
  getWorkoutById, 
  resetWorkoutsFromFile, 
  updateWorkoutById 
} from "../services/workoutService.js";


export const getAllWorkoutsController = async (req, res) => {
  try {
    const workouts = await getAllWorkouts();
    res.send(workouts);
  } catch (error) {
    res.status(500).send({ message: "Error fetching workouts", error: error.message });
  }
};


export const getWorkoutByIdController = async (req, res) => {
  try {
    const workout = await getWorkoutById(req.params.id);
    if (!workout) {
      return res.status(404).json({ message: "Workout not found" });
    }
    res.json(workout);
  } catch (error) {
    res.status(500).json({ message: `Invalid workout id: ${req.params.id}` });
  }
};


export const createWorkoutController = async (req, res) => {
  try {
   
    const savedWorkout = await createWorkout(req.body);
    res.status(201).json(savedWorkout);
  } catch (error) {
 
    res.status(400).json({ message: "Error creating workout", error: error.message });
  }
};


export const resetWorkoutsController = async (req, res) => {
  try {
    const allWorkouts = await resetWorkoutsFromFile();
    res.status(201).json(allWorkouts);
  } catch (error) {
    res.status(400).json({ 
      message: "Error resetting workouts from file", 
      error: error.message 
    });
  }
};


export const deleteWorkoutController = async (req, res) => {
  try {
    const deletedWorkout = await deleteWorkoutById(req.params.id);
    if (!deletedWorkout) {
      return res.status(404).json({ message: "Workout not found: could not delete" });
    }
    res.json({
      message: "Workout deleted successfully",
      workout: deletedWorkout
    });
  } catch (error) {
    res.status(500).send({ message: "Error deleting workout", error: error.message });
  }
};


export const updateWorkoutController = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedWorkout = await updateWorkoutById(id, req.body);
    
    if (!updatedWorkout) {
      return res.status(404).send({ message: "Workout not found" });
    }
    res.send(updatedWorkout);
  } catch (error) {
    res.status(400).send({ message: "Error updating workout", error: error.message });
  }
};