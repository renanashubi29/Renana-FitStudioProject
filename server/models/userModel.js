import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
     email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },

    phone: {
      type: String,
      required: true
    },

    address: {
      city: {
        type: String,
        required: true
      },
      street: {
        type: String,
        required: true
      },
      houseNumber: {
        type: String,
        required: true
      }
    },
    role: {
      type: String,
      enum: ["coach", "trainer", "admin"],
      required: true
    },
 
   plan: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Plan", // This must match the model name of your Plan schema
      default: null,
      // Optional: require it only for trainees/trainers
      required: function() { return this.role === 'trainer'; } 
    },
    // שדה הותק - חובה רק למאמנת
    experience: {
      type: Number,
      required: function() { return this.role === 'coach'; }
    },

    // שדה ההתמחות -  חובה רק למאמנת
    specialization: {
      type: String, 
      trim: true,
      required: function() { return this.role === 'coach'; } // הוספנו את הולידציה גם כאן!
    },
    userName: {
      type: String,
      required: true,
      trim: true
    },

    password: {
      type: String,
      required: true
    }

    
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
