import Task from "../models/Task.js";
import College from "../models/CollgeTask.js";

export const createCollegeTask = async (req, res) => {
  try {
    const { CollegeTaskname, task } = req.body;

    if (!CollegeTaskname) {
      return res
        .status(400)
        .json({ message: "Please provide CollegeTaskName " });
    }

    const ctreatedProject = await College.create({
      CollegeTaskname,
      collegeId: task || [],
    });

    if (!ctreatedProject) {
      return res
        .status(401)
        .json({ message: "Something went wromg, while creating Collegetask!" });
    }

    return res
      .status(201)
      .json({
        message: "CollegeTask created sccessfully",
        data: ctreatedProject,
      });
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
};




export const Asigntasks = async (req, res) => {
  try {
    const { title, taskDescription, dueDate, CollegeId } = req.body;

    

    if (!title || !dueDate) {
      return res.status(400).json({ message: "Please provide title name and due date" });
    }

  

    const createdTask = await Task.create({
      title,
      description: taskDescription,
      dueDate
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


