import jwt from "jsonwebtoken";
import "dotenv/config";

const { JWT_SECRET_KEY, NODE_ENV } = process.env;

export const generateToken = (userId, res) => {
  const token = jwt.sign({ userId }, JWT_SECRET_KEY, {
    expiresIn: "7d",
  });

  console.log(token);

  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true, // prevent XSS attack: cross-site scripting
    sameSite: "strict", // prevent CSRF attack
    secure: NODE_ENV === "development" ? false : true, //HTTPS at production , HTTP at development
  });
};
