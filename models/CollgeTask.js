import mongoose from "mongoose";

const collegeSchema = new mongoose.Schema(
  {
    CollegeTaskName : {
      type: String,
      required: true,
      unique : true,
      sparse : true,
      trim : true
    },
   collegeId:  [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }]

  },
  { timestamps: true }
);
collegeSchema.index({collegeId : 1})
const College = mongoose.model("College", collegeSchema);
export default College;
