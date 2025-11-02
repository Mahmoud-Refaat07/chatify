import mongoose from "mongoose";
import { ENV } from "./env.js";
const URI = ENV.MONGO_URL;

export const connectDb = async () => {
  try {
    await mongoose.connect(URI);
    console.log("connected to database");
  } catch {
    console.log("failed to connect to database");
    process.exit(1);
  }
};
