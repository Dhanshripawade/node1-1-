import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    index: true, // ✅ Add a basic index on name
  },
  email: {
    type: String,
    required: true,
    unique: true, // ✅ Creates a unique index on email
  },
  age: {
    type: Number,
    required: true,
  },
});

// ✅ Optional: compound or custom index
// userSchema.index({ name: 1, age: -1 });

const User = mongoose.model("User", userSchema);

export default User;
