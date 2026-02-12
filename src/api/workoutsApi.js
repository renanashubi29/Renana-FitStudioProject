export const handleWorkouts = async () => {
  const response = await fetch("http://localhost:5000/api/workouts");

  if (!response.ok) throw new Error("Failed to fetch products");

  const result = await response.json();
 return result.data; 
};