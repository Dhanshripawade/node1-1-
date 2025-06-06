import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, 
      required: true },
    description: String,
   
    dueDate: {
      type: String,
      required: true,
    },
    assignTo :  {
      type : mongoose.Schema.Types.ObjectId,
      ref : "Members"
    }

   },
  { timestamps: true }
);

const Task = mongoose.model("Task", taskSchema);
export default Task;
