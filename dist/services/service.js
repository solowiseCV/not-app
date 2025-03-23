"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const noteModel_1 = __importDefault(require("../models/noteModel"));
const user_model_1 = __importDefault(require("../models/user.model"));
class NoteServices {
    getAllNotes(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield noteModel_1.default.find({ user: userId }, "-__v");
        });
    }
    addNote(data, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield noteModel_1.default.create(Object.assign(Object.assign({}, data), { user: userId }));
        });
    }
    getNoteById(id, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield noteModel_1.default.findOne({ _id: id, user: userId }, "-__v");
        });
    }
    editNoteById(id, data, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield noteModel_1.default.findOneAndUpdate({ _id: id, user: userId }, { $set: data }, { new: true });
        });
    }
    deleteNoteById(id, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield noteModel_1.default.findOneAndDelete({ _id: id, user: userId });
        });
    }
    getNotesByCategory(categoryId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield noteModel_1.default.find({ category: categoryId, user: userId }, "-__v");
        });
    }
    updateNote(id, data, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield noteModel_1.default.findOneAndUpdate({ _id: id, user: userId }, { $set: data }, { new: true });
        });
    }
    getUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield user_model_1.default.findOne({ email });
        });
    }
}
exports.default = new NoteServices();
