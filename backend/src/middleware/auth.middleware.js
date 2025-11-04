import jwt from "jsonwebtoken";
import User from "../models/user.js";
import { ENV } from "../lib/env.js";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res
        .status(401)
        .json({ message: "unauthorized - no token provided" });
    }

    const decoded = jwt.verify(token, ENV.JWT_SECRET_KEY);
    if (!decoded) {
      return res.status(401).json({ message: "unauthorized - invalid token" });
    }

    const user = await User.findById(decoded.userId).select("-password");
    if (!user) res.status(401).json({ message: "user not found" });

    req.user = user;
    next();
  } catch (error) {
    console.log("Error in protect route middleware", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
