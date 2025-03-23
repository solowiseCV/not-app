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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = exports.login = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const service_1 = __importDefault(require("../services/service"));
const auth_service_1 = require("../services/auth.service");
const user_model_1 = __importDefault(require("../models/user.model"));
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        // Find user by email
        const user = yield service_1.default.getUserByEmail(email);
        if (!user) {
            res.status(401).json({ error: 'Invalid credentials' });
            return;
        }
        // Verify password
        const isPasswordValid = yield bcryptjs_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            res.status(401).json({ error: 'Invalid credentials' });
            return;
        }
        // Generate JWT token
        const token = (0, auth_service_1.generateToken)(user);
        // Return user info without password and token
        const { password: _ } = user, userWithoutPassword = __rest(user, ["password"]);
        res.status(200).json({
            token,
            user: userWithoutPassword
        });
    }
    catch (error) {
        res.status(500).json({ error: 'Login failed' });
    }
});
exports.login = login;
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, phone, password } = req.body;
        // Hash password
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        const user = yield user_model_1.default.create({
            name,
            email,
            phone,
            password: hashedPassword
        });
        const token = (0, auth_service_1.generateToken)(user);
        res.status(201).json({
            success: true,
            message: "User registered successfully",
            token
        });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.register = register;
