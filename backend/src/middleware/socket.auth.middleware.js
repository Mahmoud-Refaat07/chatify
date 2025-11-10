import User from "../models/user.js";
import jwt from "jsonwebtoken";
import { ENV } from "../lib/env.js";

export const socketAuthMidlleware = async (socket, next) => {
  try {
    // extract token from http-only cookies
    const token = socket.handshake.headers.cookie
      ?.split("; ")
      .find((row) => row.startsWith("jwt="))
      ?.split("=")[1];

    if (!token) {
      console.log("Socket connection rejected: no token provided");
      return next(new Error("Unauthorized - No Token Provided"));
    }

    // verify token
    const decoded = jwt.verify(token, ENV.JWT_SECRET_KEY);
    if (!decoded) {
      console.log("Socket connection rejected: no token provided");
      return next(new Error("Unauthorized - Invalid Token"));
    }

    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      console.log("Socket connection rejected: no token provided");
      return next(new Error("User not found"));
    }

    socket.user = user;
    socket.userId = user._id.toString();

    console.log(`Socket authenticated for user: ${user.username} ${user._id}`);

    next();
  } catch (error) {
    console.log("Error in socket authentication", error.message);
    next(new Error("Unauthorized - Authentication Failed"));
  }
};
