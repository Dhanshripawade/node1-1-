import Members from "../models/Members.js";
import Task from "../models/Task.js";

export const createMembers = async (req, res) => {
  try {
    const { memberName, email, mobileNumber, age, assignTo } = req.body;

    if (!memberName || !email || !mobileNumber) {
      return res.status(401).json({
        success: false,
        message: "Please Provide membername, email and monbilenumber",
      });
    }
    const createMember = await Members.create({
      memberName,
      email,
      mobileNumber,
      age,
    });
    if (!createMember) {
      return res.status(401).json({
        success: false,
        message: "Something went wrong , while creating members",
      });
    }
    const memberExists = await Task.findOne({ _id: assignTo });

    memberExists.assignTo = createMember._id;
    const updatedMember = await Task.findByIdAndUpdate(
      { _id: assignTo },
      { assignTo: memberExists.assignTo },
      { new: true }
    );

    console.log("Updated member:", updatedMember);

    if (!updatedMember) {
      return res
        .status(400)
        .json({ message: "Something went wrong while updating Project!" });
    }
    return res.status(201).json({
      success: true,
      message: " members created successfully",
      data: updatedMember,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: err.message,
    });
  }
};

//get all members
export const getallMembers = async (req, res) => {
  try {
    const allmembers = await Members.find().populate("assignTo");

    if (!allmembers) {
      return res.status(404).json({ message: "Members not found" });
    }
    return res
      .status(201)
      .json({ message: "All members found", data: allmembers });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: err.message,
    });
  }
};

//delete members
export const deleteMembers = async (req, res) => {
  try {
    const { _id } = req.body;

    if (!_id) {
      return res.status(401).json({
        message: "member id not found",
      });
    }

    const deleteData = await Members.findByIdAndDelete(_id);

    if (!deleteData) {
      return res.status(401).json({
        success: false,
        message: "Something Went Wrong, Members not found",
      });
    }

    return res.status(201).json({
      success: true,
      message: "Members deleted Successfully",
      data: deleteData,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: err.message,
    });
  }
};

//update members
export const updateMembers = async (req, res) => {
  try {
    const { id, dataToUpdate } = req.body;
    const option = { new: true };

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Member ID is required",
      });
    }

    console.log(dataToUpdate);

    const updatedMember = await Members.findByIdAndUpdate(
      id,
      dataToUpdate,
      option
    );

    if (!updatedMember) {
      return res.status(404).json({
        success: false,
        message: "Member not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Member updated successfully",
      data: updatedMember,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: err.message,
    });
  }
};

//view member
export const viewMember = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(401).json({
        success: false,
        message: "Id not found",
      });
    }
    const viewData = await Members.findById(id);
    if (!viewData) {
      return res.status(404).json({
        success: false,
        message: "Member not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Members found successfully",
      data: viewData,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: err.message,
    });
  }
};



