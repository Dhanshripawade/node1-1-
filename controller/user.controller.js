
import UserRegister from "../models/UserRegister.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";


//User register
export const userregister = async (req, res) => {
  try {
    const existingUser = await UserRegister.findOne({email: req.body.email,});
   if (existingUser) {
      return res.status(400).json({ success: false, message: "email Already Exists" });
    }
      const hashedpassword = await bcrypt.hash(req.body.password, 10);
      const UserToSave = new UserRegister
      ({
      Username: req.body.Username,
      password: hashedpassword,
      Name: req.body.Name,
      email: req.body.email,
      mobileNumber: req.body.mobileNumber,
      education : req.body.education,
      address : req.body.address,
       });
      const savedUser = await UserToSave.save();
      return res.status(201).json
      ({
      success: true,
      message: "User created successfully",
      data: savedUser,
      });
      } catch (error) {
      return res.status(500).json
      ({
      success: false,
      message: "Error while registering User",
      error: error.message,
      });
    }
};


//user login
export const userlogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserRegister.findOne({ email: email });
    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid email" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ success: false, message: "Invalid Password" });
    }
    const payload = {
      email: user.email,
      
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "12h" });
     res.status(200).json({ message : "User Login Successfully " , success: true, token , data : payload});
    } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error while login",
      error: error.message,
    });
  }
};

//reset password
export const resetUser = async(req , res ) =>
{
  try{
      const {email , currentPassword , newPassword , conformPassword} = req.body;
      const user = await UserRegister.findOne({email});
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