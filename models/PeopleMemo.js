import mongoose from "mongoose";
const { Schema, model, Types } = mongoose;
const peopleMemoSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide name"],
    },
    organization: {
      type: String,
      default: "Unknown",
    },
    place: {
      type: String,
      default: "Unknown",
    },
    description: {
      type: String,
      maxlength: [300, "Description can not be more than 300 characters"],
      default: "Unknown",
    },
    createdBy: {
      type: Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
  },
  { timestamps: true }
);

const PeopleMemo = model("PeopleMemo", peopleMemoSchema);
export default PeopleMemo;

