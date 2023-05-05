import mongoose from "mongoose";
const { Schema, model } = mongoose;
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide name"],
      minlength: 5,
      maxlength: 15,
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Please provide unique email"],
    },
    password: {
      type: String,
      required: [true, "Please provide password"],
      minlength: 8,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
  },
  { timestamps: true }
);
const User = model("User", userSchema);
export default User;
