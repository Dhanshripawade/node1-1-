import SuperAdmin from "../models/SuperAdminRegister.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

//Register SuperAdmin
export const getsuperAdmindata = async (req, res) => {
  try {
    const existingSuperAdmin = await SuperAdmin.findOne({
      Username: req.body.Username,
    });
    if (existingSuperAdmin) {
      return res.status(400).json({
        success: false,
        message: "Username already exist",
      });
    }
    const hashedpassword = await bcrypt.hash(req.body.password, 10);
    const SuperAdminSave = new SuperAdmin({
      Username: req.body.Username,
      Name: req.body.Name,
      password: hashedpassword,
      email: req.body.email,
      contactNumber: req.body.contactNumber,
    });
    const savedSuperAdmin = await SuperAdminSave.save();
    return res.status(202).json({
      success: true,
      message: "SuperAdmin Created Successfully",
      data: savedSuperAdmin,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

//Login SuperAdmin
export const postsuperAdmindata = async (req, res) => {
  try {
    const { Username, password } = req.body;
    const superadmin = await SuperAdmin.findOne({ Username: Username });
    if (!superadmin) {
      return res.status(401).json({
        success: false,
        message: "Invalid Username",
      });
    }
    const passwordMatch = await bcrypt.compare(password, superadmin.password);
    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid Password",
      });
    }
    const payload = {
      Username: superadmin.Username,
      
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "12h" });
    res.status(200).json
    ({
      message : "SuperAdmin Login Successfully", 
      success: true, token  , 
      data : payload 
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Serval Error",
      error: error.message,
    });
  }
};

// Reset Password 
export const resetSuperAdmin = async (req, res) => {
  try {
    const { Username, currentpassword , newPassword , conformPassword  } = req.body;
    const superadmin = await SuperAdmin.findOne({ Username });
    if (!superadmin) {
      return res.status(404).json({
        success: false,
        message: "Username not found",
      });
    } 
    const isPasswordMatch = await bcrypt.compare(currentpassword, superadmin.password);
    if (!isPasswordMatch) {
    return res.status(400).json ({
      success : false,
      message : "Current Password is incorrect",
    });
  };

  if(newPassword !== conformPassword) {
    return res.status(400).json ({
      success : false,
      message : "New Password and confirmation password do not match",
    });
  };
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    superadmin.password = hashedPassword;
    await superadmin.save();
    return res.status(200).json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

//Decoded 
export const getallSuperAdmin = async(req , res) => {
  try {
    const authHeader = req.headers.authorization;
    if(!authHeader ||  !authHeader.startsWith("Bearer") ) {
      return res.status(400).json ({
        success : false,
        message : "Authorization Token is missing"
      });
    };
const token = authHeader.split(" ")[1];
const decoded = jwt.verify(token , process.env.JWT_SECRET);
res.status(200).json ({
  success  : true,
  message : "GET SUPER ADMIN DATA",
  data : decoded,
})
  }catch(error){
    return res.status(400).json ({
      success : false,
      message : "INTERNASL SERVER ERROR",

    });

  }
};

