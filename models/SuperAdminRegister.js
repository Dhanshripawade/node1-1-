import mongoose, { model } from "mongoose";

const superAdminSchema = new mongoose.Schema(
  {
    Username: {
      type: String,
      required: true,
      unique: true,
    },
    Name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    contactNumber: {
      type: Number,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
   
  },
  { timestamps: true }
);

const SuperAdmin = model("SuperAdmin", superAdminSchema);

export default SuperAdmin;
