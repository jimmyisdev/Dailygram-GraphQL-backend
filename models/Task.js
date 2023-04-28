import mongoose from "mongoose";
const { Schema, model, Types } = mongoose;
const taskSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide task name"],
    },
    description: {
      type: String,
      required: [true, "Please provide task price"],
      default: "Unknown",
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    level: {
      type: String,
      enum: ["unnecessary", "normal", "emergent"],
      default: "normal",
    },
    createdBy: {
      type: Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
  },
  { timestamps: true }
);
const Task = model("Task", taskSchema);
export default Task;
