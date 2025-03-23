"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loggingMiddleware = loggingMiddleware;
function loggingMiddleware(req, res, next) {
    const timestamp = new Date().toISOString();
    console.log(`${timestamp} - ${req.method} ${req.originalUrl}`);
    next();
}
