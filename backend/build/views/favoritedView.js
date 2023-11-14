"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const { addToFavorites, getFavorites, getFavorite, deleteFavorite, } = require("../controllers/favoritedController");
const isAuthenticated = require("../middlewares/isAuthenticated");
const router = express_1.default.Router();
router.use(isAuthenticated);
router.post("/", addToFavorites);
router.get("/", getFavorites);
router.get("/:id", getFavorite);
router.delete("/:id", deleteFavorite);
module.exports = router;
//# sourceMappingURL=favoritedView.js.map