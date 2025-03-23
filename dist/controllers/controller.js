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
const service_1 = __importDefault(require("../services/service"));
const constants_1 = __importDefault(require("../constants"));
const category_model_1 = require("../models/category.model");
class Controller {
    // Fetch home
    fetch(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            res.status(200).send({ message: constants_1.default.MESSAGES.FETCHED, success: true });
        });
    }
    // Fetch all notes
    fetchMany(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const notes = yield service_1.default.getAllNotes(req.user.userId);
                res.status(200).send({
                    message: constants_1.default.MESSAGES.FETCHED,
                    success: true,
                    data: notes,
                });
            }
            catch (err) {
                res.status(500).send({
                    message: err.message || constants_1.default.MESSAGES.ERROR,
                    success: false,
                });
            }
        });
    }
    // Create note
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield service_1.default.addNote(req.body, req.user.userId);
                res.status(201).send({
                    message: constants_1.default.MESSAGES.CREATED,
                    success: true,
                    data,
                });
            }
            catch (err) {
                res.status(500).send({
                    message: err.message || constants_1.default.MESSAGES.ERROR,
                    success: false,
                });
            }
        });
    }
    // Get a note by ID
    fetchOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const data = yield service_1.default.getNoteById(id, req.user.userId);
                if (!data) {
                    res
                        .status(404)
                        .send({ message: "Note not found", success: false });
                    return;
                }
                res.status(200).send({
                    message: constants_1.default.MESSAGES.FETCHED,
                    success: true,
                    data,
                });
            }
            catch (err) {
                res.status(500).send({
                    message: err.message || constants_1.default.MESSAGES.ERROR,
                    success: false,
                });
            }
        });
    }
    // Edit note
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const data = yield service_1.default.editNoteById(id, req.body, req.user.userId);
                if (!data) {
                    res
                        .status(404)
                        .send({ message: "Note not found", success: false });
                    return;
                }
                res.status(200).send({
                    message: constants_1.default.MESSAGES.UPDATED,
                    success: true,
                    data,
                });
            }
            catch (err) {
                res.status(500).send({
                    message: err.message || constants_1.default.MESSAGES.ERROR,
                    success: false,
                });
            }
        });
    }
    // Delete a note
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const data = yield service_1.default.deleteNoteById(id, req.user.userId);
                if (!data) {
                    res
                        .status(404)
                        .send({ message: "Note not found", success: false });
                    return;
                }
                res.status(200).send({
                    message: constants_1.default.MESSAGES.DELETED,
                    success: true,
                    data,
                });
            }
            catch (err) {
                res.status(500).send({
                    message: err.message || constants_1.default.MESSAGES.ERROR,
                    success: false,
                });
            }
        });
    }
    // Get notes by category
    getNotesByCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { categoryId } = req.params;
                const notes = yield service_1.default.getNotesByCategory(categoryId, req.user.userId);
                if (!notes || notes.length === 0) {
                    res.status(404).send({
                        message: "No notes found for this category",
                        success: false
                    });
                    return;
                }
                res.status(200).send({
                    message: constants_1.default.MESSAGES.FETCHED,
                    success: true,
                    data: notes
                });
            }
            catch (err) {
                res.status(500).send({
                    message: err.message || constants_1.default.MESSAGES.ERROR,
                    success: false
                });
            }
        });
    }
    // Update note (PUT method)
    updateNote(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const updateData = req.body;
                const updatedNote = yield service_1.default.updateNote(id, updateData, req.user.userId);
                if (!updatedNote) {
                    res.status(404).send({
                        message: constants_1.default.MESSAGES.NOT_FOUND,
                        success: false
                    });
                    return;
                }
                res.status(200).send({
                    message: constants_1.default.MESSAGES.UPDATED,
                    success: true,
                    data: updatedNote
                });
            }
            catch (err) {
                res.status(500).send({
                    message: err.message || constants_1.default.MESSAGES.ERROR,
                    success: false
                });
            }
        });
    }
    // Create category
    createCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, description } = req.body;
                const category = yield category_model_1.Category.create({ name, description });
                res.status(201).json({
                    success: true,
                    message: "Category created successfully",
                    data: category
                });
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    message: error.message || "Error creating category"
                });
            }
        });
    }
}
exports.default = new Controller();
