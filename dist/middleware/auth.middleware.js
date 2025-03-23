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
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
exports.isAuthenticatedUser = isAuthenticatedUser;
const auth_service_1 = require("../services/auth.service");
function isAuthenticatedUser(payload) {
    return payload && typeof payload.userId === 'string' && typeof payload.email === 'string';
}
const authenticate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authHeader = req.headers.authorization;
        if (!(authHeader === null || authHeader === void 0 ? void 0 : authHeader.startsWith('Bearer '))) {
            res.status(401).json({ error: 'No token provided' });
            return;
        }
        const token = authHeader.split(' ')[1];
        const payload = (0, auth_service_1.verifyToken)(token);
        if (!payload || !isAuthenticatedUser(payload)) {
            res.status(401).json({ error: 'Invalid token' });
            return;
        }
        req.user = payload;
        next();
    }
    catch (error) {
        res.status(401).json({ error: 'Authentication failed' });
    }
});
exports.authenticate = authenticate;
