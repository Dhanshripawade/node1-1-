import mongoose from "mongoose";

const UserRegisterSchema = new mongoose.Schema(
  {
    Username: {
      type: String,
      required: true,
      unique: true,
    },
    Name: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
    },
    mobileNumber: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    education: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

const UserRegister =
  mongoose.models.UserRegister ||
  mongoose.model("UserRegister", UserRegisterSchema);

export default UserRegister;
