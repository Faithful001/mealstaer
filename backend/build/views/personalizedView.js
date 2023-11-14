"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const { getAllPersonalized, getPersonalized, createPersonalized, updatePersonalized, deletePersonlized, } = require("../controllers/personalizedController");
const isAuthenticated = require("../middlewares/isAuthenticated");
const router = express_1.default.Router();
router.use(isAuthenticated);
router.get("/", getAllPersonalized);
router.get("/:id", getPersonalized);
router.post("/", createPersonalized);
router.patch("/:id", updatePersonalized);
router.delete("/:id", deletePersonlized);
module.exports = router;
//# sourceMappingURL=personalizedView.js.map