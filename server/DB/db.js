import mongoose from "mongoose";
const mongoURI = "mongodb://127.0.0.1:27017/fitStudio";

export const connectedDB=async(mongoURI)=>{
  try{
  await mongoose.connect(mongoURI);
  console.log("MongoDB Connected:gocode-shop");
  }
  catch(err){
console.log("MongoDB Connection Error:",err.message);
process.exit(1);
  }
}