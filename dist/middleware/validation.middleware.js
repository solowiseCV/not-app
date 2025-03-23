"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCategory = exports.validateNote = exports.validateLogin = exports.validateRegister = void 0;
// import { INote } from "../models/noteModel";
const validation_schema_1 = require("./validation.schema");
const validateRegister = (req, res, next) => {
    const { error } = validation_schema_1.registerSchema.validate(req.body);
    if (error) {
        res.status(400).json({ error: error.details[0].message });
        return;
    }
    next();
};
exports.validateRegister = validateRegister;
const validateLogin = (req, res, next) => {
    const { error } = validation_schema_1.loginSchema.validate(req.body);
    if (error) {
        res.status(400).json({ error: error.details[0].message });
        return;
    }
    next();
};
exports.validateLogin = validateLogin;
const validateNote = (req, res, next) => {
    const { error } = validation_schema_1.noteSchema.validate(req.body);
    if (error) {
        res.status(400).json({ error: error.details[0].message });
        return;
    }
    next();
};
exports.validateNote = validateNote;
const validateCategory = (req, res, next) => {
    const { error } = validation_schema_1.categorySchema.validate(req.body);
    if (error) {
        res.status(400).json({ error: error.details[0].message });
        return;
    }
    next();
};
exports.validateCategory = validateCategory;
