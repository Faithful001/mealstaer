"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User = require("../models/userModel");
const verifyJwt = async (req, res, next) => {
    const { token } = req.cookie;
    try {
        const { _id } = jsonwebtoken_1.default.verify(token, process.env.JWT_SEC);
        req.user = await User.findOne({ _id }).select("_id");
        next();
    }
    catch (error) {
        res.clearCookie("token");
        res.status(401).json({ error: "You are not authorized " + error });
    }
};
module.exports = verifyJwt;
//# sourceMappingURL=verifyJwt.js.map