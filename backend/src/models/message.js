import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    senderId: {
      type: String,
      ref: "User",
      required: true,
    },
    receiverId: {
      type: String,
      ref: "User",
      required: true,
    },
    text: {
      type: String,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true } // createdAt , updatedAt
);

export default mongoose.model("Message", messageSchema);
