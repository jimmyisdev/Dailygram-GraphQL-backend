import mongoose from "mongoose";
const { Schema, model, Types } = mongoose;
const expenditureSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide expenditure name"],
    },
    price: {
      type: Number,
      required: [true, "Please provide expenditure price"],
      default: 0,
    },
    description: {
      type: String,
      maxlength: [200, "Description can not be more than 200 characters"],
    },
    createdBy: {
      type: Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
  },
  { timestamps: true }
);
const Expenditure = model("Expenditure", expenditureSchema);
export default Expenditure;
