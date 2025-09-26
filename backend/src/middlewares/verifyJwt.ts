import jwtUtil from "../utils/jwt.util";
import { Request, Response, NextFunction } from "express";
const User = require("../models/userModel");

const verifyJwt = async (req: Request, res: Response, next: NextFunction) => {
  const { token } = req.cookies;
  try {
    const { _id } = jwtUtil.verifyToken(token);
    req.user = await User.findOne({ _id }).select("_id");
    next();
  } catch (error) {
    res.clearCookie("token");
    res.status(401).json({ error: "You are not authorized " + error });
  }
};

module.exports = verifyJwt;
