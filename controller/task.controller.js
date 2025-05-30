import Task from "../models/Task.js";
import College from "../models/CollgeTask.js";


// create task
export const createCollegeTask = async (req, res) => {
  try {
    const { CollegeTaskName, task } = req.body;

    if (!CollegeTaskName) {
      return res
        .status(400)
        .json({ message: "Please provide CollegeTaskName" });
    }

    const createdProject = await College.create({
      CollegeTaskName,         
      collegeId: task || [],
    });

    if (!createdProject) {
      return res
        .status(401)
        .json({ message: "Something went wrong while creating College task!" });
    }

    return res.status(201).json({
      message: "CollegeTask created successfully",
      data: createdProject,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error",
      error: err.message,
    });
  }
};



//assign task and update task
export const Asigntasks = async (req, res) => {
  try {
    const { title, taskDescription, dueDate, CollegeId , member } = req.body;
    if (!title || !dueDate) {
      return res.status(400).json({ message: "Please provide title name and due date" });
    }
    const createdTask = await Task.create({
      title,
      description: taskDescription,
      dueDate,
      assignTo : member, 
    });

    if (!createdTask) {
      return res.status(400).json({ message: "Something went wrong while creating Task!" });
    }

    const projectExists = await College.findOne({_id:CollegeId});
  
    projectExists.collegeId.push(createdTask._id)
    const updatedProjet = await College.findByIdAndUpdate(
     {_id:CollegeId} , {collegeId : projectExists.collegeId} , {new:true});

    console.log("Updated Project:", updatedProjet);

    if (!updatedProjet) {
      return res.status(400).json({ message: "Something went wrong while updating Project!" });
    }

    return res.status(200).json({ message: "Task added successfully", data: updatedProjet });

  } catch (err) {
    console.error("Error in Asigntasks:", err);
    return res.status(500).json({ message: "Internal server error", error: err.message || err });
  }
};



//get all tasks

export  const getallCollegeTask = async (req , res) => {

    try {
      const allData = await College.find().populate('collegeId')
      console.log(allData);
      if(!allData) {
        return res.status(404).json({message :"CollegeTask Not Found"})
      }
        return res.status(200).json({message :"All CollegeTask ", data : allData})
      }
    catch (err) {
        return res.status(500).json ({message : "Internal Server Error" , error : err})
    }

}


