import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import Adminroute from "./routes/Admin.js";
import Userroute from "./routes/User.js";
import superAdminroute from "./routes/SuperAdmin.js";

import User from "../Models/Adddata.js";
import College from "./models/CollgeTask.js";


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

// Ensure indexing if not already created
(async () => {
  try {
    // Get all current indexes
    const existingIndexes = await College.collection.getIndexes();

    // Check if CollegeTaskName index exists
    if (!('CollegeTaskName_1' in existingIndexes)) {
      console.log("Index on CollegeTaskName not found. Creating...");

      // Create a unique partial index on CollegeTaskName
      await College.collection.createIndex(
        { CollegeTaskName: 1 },
        {
          unique: true,
          partialFilterExpression: { CollegeTaskName: { $exists: true, $ne: null } },
        }
      );

      console.log("Index on CollegeTaskName created successfully.");
    } else {
      console.log("Index on CollegeTaskName already exists.");
    }

    // Optional: check and create other indexes
    if (!('collegeId_1' in existingIndexes)) {
      console.log("Index on collegeId not found. Creating...");
      await College.collection.createIndex({ collegeId: 1 });
      console.log("Index on collegeId created successfully.");
    }

  } catch (err) {
    console.error("Index check or creation error:", err);
  }
})();


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
