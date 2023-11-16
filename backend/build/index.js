"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const passport_1 = __importDefault(require("passport"));
const express_session_1 = __importDefault(require("express-session"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const port = process.env.PORT || 8080;
const mealView = require("./views/mealView");
const favoritedView = require("./views/favoritedView");
const userView = require("./views/userView");
const personalizedView = require("./views/personalizedView");
// const User = require("./models/userModel");
// const URL = require("./URL");
require("./controllers/passport");
const app = (0, express_1.default)();
//middleware
const twoDaysInMilliseconds = 2 * 24 * 60 * 60 * 1000;
app.use((0, express_session_1.default)({
    secret: process.env.COOKIE_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: twoDaysInMilliseconds,
        expires: new Date(Date.now() + twoDaysInMilliseconds),
    },
}));
app.use((0, cookie_parser_1.default)());
app.use((req, res, next) => {
    res.setHeader("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
    next();
});
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.use((0, cors_1.default)({
    origin: "http://localhost:5173",
    method: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true,
}));
app.options("*", (0, cors_1.default)());
app.use(express_1.default.json());
app.use((0, morgan_1.default)("combined"));
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});
//middleware routes
app.use("/api/data", mealView);
app.use("/api/fave", favoritedView);
app.use("/api/personalized", personalizedView);
app.use("/api/auth", userView);
mongoose_1.default
    .connect(process.env.MONGO_URI)
    .then(() => {
    app.listen(port, () => {
        console.log(`JSON server is running at http://localhost:${port}`);
    });
})
    .catch((error) => {
    console.log(error);
});
//# sourceMappingURL=index.js.map