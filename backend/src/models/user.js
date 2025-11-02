import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: String,
    email: {
      type: String,
      requried: true,
      unique: true,
    },
    password: {
      type: String,
      requried: true,
      minLength: 6,
    },
    profilePic: {
      type: String,
      default: "",
    },
  },
  { timestamps: true } // createdAt , updatedAt
);

export default mongoose.model("User", userSchema);
