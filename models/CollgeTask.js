import mongoose from "mongoose";

const collegeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    department : {
        type : String
    }
  },
  { timestamps: true }
);

const College = mongoose.model("College", collegeSchema);
export default College;
