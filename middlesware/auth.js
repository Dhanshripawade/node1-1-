import mongoose from "mongoose";

import College from "../models/CollgeTask.js";

const validateCollege = async (req, res, next) => {
  try {
    const { collegeId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(collegeId)) {
      return res.status(400).json({
        success : false ,
         message: "Invalid collegeId format" });
    }

    const college = await College.findById(collegeId);
    if (!college) {
      return res.status(404).json({
        success : false ,
         message: "College not found" });
    }

    next();
  } catch (err) {
    res.status(500).json({
        success : false ,
         message: "Server Error", 
         error: err.message });
  }
};

export default validateCollege;
