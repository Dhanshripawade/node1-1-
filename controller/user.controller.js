
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
      password : user.password,
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

