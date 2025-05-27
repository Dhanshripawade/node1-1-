import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import Adminroute from "./routes/Admin.js";
import Userroute from "./routes/User.js";
import superAdminroute from "./routes/SuperAdmin.js";

import User from "../Models/Adddata.js";

const app = express();
dotenv.config();
const PORT = 9000;

app.use(express.json());

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", true);
    await mongoose.connect(process.env.DATABASE_URL);
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
};

connectDB();

app.use("/admin", Adminroute);
app.use("/user", Userroute);
app.use("/superAdmin", superAdminroute);


app.post("/adddata", async (req, res) => {
  try {
    const { name, email, age } = req.body;
    const user = new User({ name, email, age });
    const savedUser = await user.save();
    res.json(savedUser);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
