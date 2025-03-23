"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const constants_1 = __importDefault(require("../constants"));
const NoteSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
        unique: true,
    },
    type: {
        type: String,
        enum: [constants_1.default.NOTE_TYPES.USER, constants_1.default.NOTE_TYPES.AGENT],
        default: constants_1.default.NOTE_TYPES.USER,
    },
    category: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'category',
        required: true,
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true,
});
const Note = (0, mongoose_1.model)(constants_1.default.DATABASES.NOTE, NoteSchema);
exports.default = Note;
