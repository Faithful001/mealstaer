"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const validator_1 = __importDefault(require("validator"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const Schema = mongoose_1.default.Schema;
const UserSchema = new Schema({
    user_name: {
        type: String,
        unique: false,
    },
    email: {
        type: String,
        required: false,
        unique: true,
    },
    password: {
        type: String,
        required: false,
        unique: false,
    },
}, { timestamps: true });
function isStrongPassword(password) {
    if (password.length < 8) {
        return false;
    }
    if (!/[A-Z]/.test(password) ||
        !/[a-z]/.test(password) ||
        !/[0-9]/.test(password) ||
        !/[¬`!"£$%^&*()-_=+/|[]{};'@\\#~?><]/.test(password)) {
        return false;
    }
    return true;
}
UserSchema.statics.signup = async function (user_name, email, password) {
    if (!user_name || !email || !password) {
        throw new Error("All fields are required");
    }
    if (!validator_1.default.isEmail(email)) {
        throw new Error("Email is not valid");
    }
    if (!isStrongPassword(password)) {
        throw new Error("Password is not strong enough");
    }
    const exists = await this.findOne({ email });
    // console.log(exists.email);
    if (exists) {
        throw new Error("Email already in use");
    }
    const salt = await bcryptjs_1.default.genSalt(10);
    const hash = await bcryptjs_1.default.hash(password, salt);
    const user = await this.create({ user_name, email, password: hash });
    return user;
};
UserSchema.statics.login = async function (email, password) {
    if (!email || !password) {
        throw new Error("All fields are required");
    }
    const user = await this.findOne({ email });
    if (user) {
        if (user.password == null) {
            throw new Error("Sign in with google like you did in the past");
        }
        const match = await bcryptjs_1.default.compare(password, user.password);
        if (!match) {
            throw new Error("Incorrect password");
        }
        else {
            return user;
        }
    }
    else {
        throw new Error("Incorrect email");
    }
};
const model = mongoose_1.default.model("User", UserSchema, "mealUsers");
module.exports = model;
//# sourceMappingURL=userModel.js.map