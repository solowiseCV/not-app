"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: [true, 'Please input your email'],
    },
    phone: {
        type: Number,
        required: [true, 'Please input your phone number'],
    },
    password: {
        type: String,
        required: [true, ' input your password'],
    }
}, {
    timestamps: true,
});
const User = (0, mongoose_1.model)('User', UserSchema);
exports.default = User;
