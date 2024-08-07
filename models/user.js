import { Schema, model } from "mongoose";

//user schema
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    userType: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    companyName: {
      type: String,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
      required: true,
    },
    fresh: {
      type: Boolean,
      required: false,
    },
  },
  { timestamps: true }
);

const User = model("User", userSchema);
export default User;
