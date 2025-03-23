"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_1 = __importDefault(require("../controllers/controller"));
const validation_middleware_1 = require("../middleware/validation.middleware");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
// Protect all note routes
router.use(auth_middleware_1.authenticate);
router.get("/", controller_1.default.fetch);
router.get("/notes", controller_1.default.fetchMany);
router.post("/notes", auth_middleware_1.authenticate, validation_middleware_1.validateNote, controller_1.default.create);
router.get("/notes/:id", controller_1.default.fetchOne);
router.patch("/notes/:id", auth_middleware_1.authenticate, validation_middleware_1.validateNote, controller_1.default.update);
router.delete("/notes/:id", controller_1.default.delete);
router.post("/notes/categories", auth_middleware_1.authenticate, validation_middleware_1.validateCategory, controller_1.default.createCategory);
router.get("/notes/categories/:categoryId", controller_1.default.getNotesByCategory);
router.put("/notes/:id", auth_middleware_1.authenticate, validation_middleware_1.validateNote, controller_1.default.updateNote);
exports.default = router;
