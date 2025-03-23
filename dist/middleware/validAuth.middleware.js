"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateLogin = exports.validateRegister = void 0;
const validateRegister = (req, res, next) => {
    const { name, email, password, phone } = req.body;
    if (!name || !email || !password || !phone) {
        res.status(400).json({ error: 'Missing required fields' });
        return;
    }
    if (password.length < 6) {
        res.status(400).json({ error: 'Password must be at least 6 characters' });
        return;
    }
    if (!email.includes('@')) {
        res.status(400).json({ error: 'Invalid email format' });
        return;
    }
    next();
};
exports.validateRegister = validateRegister;
const validateLogin = (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).json({ error: 'Missing required fields' });
        return;
    }
    next();
};
exports.validateLogin = validateLogin;
