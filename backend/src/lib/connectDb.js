import mongoose from "mongoose";
import "dotenv/config";
const URI = process.env.MONGO_URL;

export const connectDb = async () => {
  try {
    await mongoose.connect(URI);
    console.log("connected to database");
  } catch {
    console.log("failed to connect to database");
    process.exit(1);
  }
};
