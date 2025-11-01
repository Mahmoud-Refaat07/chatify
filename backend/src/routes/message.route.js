import express from "express";

const router = express.Router();

router.get("/send", (req, res) => {
  res.send("TEST2");
});

export default router;
