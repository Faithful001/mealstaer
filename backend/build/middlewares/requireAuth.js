"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User = require("../models/userModel");
const requireAuth = async (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).json({ error: "Authorization token required" });
    }
    const token = authorization.split(" ")[1];
    try {
        const { _id } = jsonwebtoken_1.default.verify(token, process.env.JWT_SEC);
        req.user = await User.findOne({ _id }).select("_id");
        next();
    }
    catch (error) {
        console.log(error);
        res.status(401).json({ error: "Request is not authorized" });
    }
};
module.exports = requireAuth;
//# sourceMappingURL=requireAuth.js.map