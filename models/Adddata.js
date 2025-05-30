import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    index: true, 
  },
  email: {
    type: String,
    required: true,
    unique: true, 
  },
  age: {
    type: Number,
    required: true,
  },
});


userSchema.index({ name: 1});

const User = mongoose.model("User", userSchema);

export default User;
