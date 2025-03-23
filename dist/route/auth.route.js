"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const validAuth_middleware_1 = require("../middleware/validAuth.middleware");
const router = (0, express_1.Router)();
router.post('/register', validAuth_middleware_1.validateRegister, auth_controller_1.register);
router.post('/login', validAuth_middleware_1.validateLogin, auth_controller_1.login);
exports.default = router;
