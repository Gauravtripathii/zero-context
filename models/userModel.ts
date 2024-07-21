import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is required, can't be empty"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Email is required, can't be empty"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required, can't be empty"],
  },
  message: {
    type: String,
    minlength: 2,
    maxlength: 50,
  },
});

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;
