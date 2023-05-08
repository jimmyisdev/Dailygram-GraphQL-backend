import mongoose from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";

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
userSchema.statics.signup = async function (name, email, password) {
  if (!name || !email || !password) {
    throw Error("All fields must be filled");
  }
  if (!validator.isEmail(email)) {
    throw Error("Email is invalid");
  }
  const exists = await this.findOne({ email });
  if (exists) {
    throw Error("Email already in use");
  }
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  const user = await this.create({ email, password: hash, name, role: "user" });
  return user;
};

const User = model("User", userSchema);
export default User;
