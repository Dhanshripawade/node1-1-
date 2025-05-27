import jwt from "jsonwebtoken";


const validateCollege = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Token not provided" });
    }

    const token = authHeader.split(" ")[1]; 
    console.log(token);

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    req.user = decoded;
   
    next();

  } catch (err) {
    return res.status(401).json({
      message: "Invalid token",
      error: err.message
    });
  }
};

export default validateCollege;
