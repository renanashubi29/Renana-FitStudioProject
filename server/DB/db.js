import mongoose from "mongoose";


export const connectedDB=async(mongoURI)=>{
  try{
  await mongoose.connect(mongoURI);
  }
  catch(err){
console.log("MongoDB Connection Error:",err.message);
process.exit(1);
  }
}