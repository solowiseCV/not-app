"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categorySchema = exports.noteSchema = exports.loginSchema = exports.registerSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const mongoose_1 = require("mongoose");
exports.registerSchema = joi_1.default.object({
    name: joi_1.default.string().required().min(2).max(50),
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().required().min(6),
    phone: joi_1.default.number().required()
});
exports.loginSchema = joi_1.default.object({
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().required()
});
exports.noteSchema = joi_1.default.object({
    title: joi_1.default.string().required().min(1).max(100),
    content: joi_1.default.string().required().min(1),
    category: joi_1.default.string().custom((value, helpers) => {
        if (!mongoose_1.Types.ObjectId.isValid(value)) {
            return helpers.error('Invalid category ID');
        }
        return value;
    }).required(),
    type: joi_1.default.string().valid('user', 'system').required()
});
exports.categorySchema = joi_1.default.object({
    name: joi_1.default.string().required().min(2).max(50),
    description: joi_1.default.string().max(200)
});
