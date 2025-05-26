
import Task from "../models/Task.js";

export const createTask = async (req, res) => {
  try {
    const { title, description, assignedBy, assignedTo, dueDate, collegeId } = req.body;

    const task = new Task({
      title,
      description,
      assignedBy,
      assignedTo,
      dueDate,
      collegeId,
    });

    const savedTask = await task.save();

    res.status(201).json({
      message: "Task created successfully",
      taskId: savedTask._id,   
      data: savedTask          
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create task",
      error: error.message
    });
  }
};





































































// export const getTasks = async (req, res) => {
//   try {
//     const tasks = await Task.find().populate("collegeId", "name location");
//     res.json({ data: tasks });
//   } catch (error) {
//     res.status(500).json({ message: "Failed to fetch tasks", error: error.message });
//   }
// };

// export const deleteTask = async (req, res) => {
//   try {
//     const task = await Task.findByIdAndDelete(req.params.id);
//     if (!task) return res.status(404).json({ message: "Task not found" });
//     res.json({ message: "Task deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Failed to delete task", error: error.message });
//   }
// };
