"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = __importDefault(require("./database"));
const logging_Middleware_1 = require("./middleware/logging.Middleware");
const note_route_1 = __importDefault(require("./route/note.route"));
const auth_route_1 = __importDefault(require("./route/auth.route"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(logging_Middleware_1.loggingMiddleware);
// Routes
app.use('/api/auth', auth_route_1.default);
app.use('/api/v1', note_route_1.default);
// Base URL Response
app.get('/', (req, res) => {
    res.send('Welcome to the API! 🎉');
});
(0, database_1.default)()
    .then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
})
    .catch((error) => {
    console.error('Failed to connect to database:', error);
    process.exit(1);
});
exports.default = app;
