import mongoose from "mongoose";
import { ENV } from "./env.js";
const URI = ENV.MONGO_URL;

export const connectDb = async () => {
  try {
    await mongoose.connect(URI);
    console.log("connected to database");
  } catch (error) {
    console.log("failed to connect to mongodb", error);
    process.exit(1);
  }
};
