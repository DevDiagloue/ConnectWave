"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//npm packages
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const helmet_1 = __importDefault(require("helmet"));
const compression_1 = __importDefault(require("compression"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const envFile = process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development';
dotenv_1.default.config({
    path: envFile,
});
// Custom Modules, Packages, Configs, etc.
const index_routes_1 = require("./routes/index.routes");
const errorHandler_1 = require("./handler/errors/errorHandler");
const checkBlackListedToken_1 = require("./middleware/checkBlackListedToken");
const app = (0, express_1.default)();
app.use(express_1.default.json({ limit: '50kb' }));
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
app.use((0, helmet_1.default)());
app.use((0, compression_1.default)());
app.disable('x-powered-by');
app.use(errorHandler_1.errorHandler);
app.use(checkBlackListedToken_1.checkBlackListedToken);
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server);
app.use((req, res, next) => {
    ;
    req.io = io;
    next();
});
//healthcheck
app.get('/healthcheck', (_, res) => {
    res.status(200).json({ error: false, message: 'healthcheck' });
});
(0, index_routes_1.initRoutes)(app);
exports.default = app;
