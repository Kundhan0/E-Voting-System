import mongoose from "mongoose";

// Define User Schema
const userSchema = new mongoose.Schema({
  id: { type: String, required: true }, // Unique identifier
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  address: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
  dateOfBirth: { type: Date, required: true },
});

// Create and export User model
const User = mongoose.model("User", userSchema);
export default User;