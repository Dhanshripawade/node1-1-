import AdminRegister from "../models/AdminRegister.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";


//Admin register
export const admindata = async (req, res) => {
  try {
    const existingUser = await AdminRegister.findOne({Username: req.body.Username,});
   if (existingUser) {
      return res.status(400).json({ success: false, message: "Username Already Exists" });
    }
      const hashedpassword = await bcrypt.hash(req.body.password, 10);
      const adminToSave = new AdminRegister
      ({
      Username: req.body.Username,
      password: hashedpassword,
      Name: req.body.Name,
      email: req.body.email,
      mobileNumber: req.body.mobileNumber,
       });
      const savedAdmin = await adminToSave.save();
      return res.status(201).json
      ({
      success: true,
      message: "Admin created successfully",
      data: savedAdmin,
      });
      } catch (error) {
      return res.status(500).json
      ({
      success: false,
      message: "Error while registering admin",
      error: error.message,
      });
    }
};

//Admin Login
export const adminlogin = async (req, res) => {
  try {
    const { Username, password } = req.body;
    const user = await AdminRegister.findOne({ Username: Username });
    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid Username" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ success: false, message: "Invalid Password" });
    }
    const payload = {
      Username: user.Username,
      
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "12h" });
     res.status(200).json({ message : "Admin Login Successfully" ,success: true, token , data : payload });
    } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error while login",
      error: error.message,
    });
  }
};


//Reset password
export const resetAdmin = async(req , res ) =>
{
  try{
      const {Username , currentPassword , newPassword , conformPassword} = req.body;
      const user = await AdminRegister.findOne({Username});
      if (!user) {
        return res.status(400).json ({
          success : false,
          message : "Username not found"
        });
      };

      const isPasswordMatch = await bcrypt.compare(currentPassword, user.password)
      if(!isPasswordMatch) {
        return res.status(400).json ({
          success : false ,
          message : "Current Password is Incorrect"
        });
      };

      if(newPassword !== conformPassword)
      {
        return res.status(400).json ({
          success : false ,
          message : "New password and conform password not match",
        });
      };
      const hashedPassword = await bcrypt.hash(newPassword, 10)
      user.password = hashedPassword;
      await user.save();
      return res.status(200).json ({
        success : true ,
        message : "password reset successfully",
      });
    } catch (error){
      return res.status(500).json ({
        success : false,
        message : "Internal Server Error",
        error : error.message,
      });

    };
}



