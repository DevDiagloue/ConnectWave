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
const passport_1 = __importDefault(require("passport"));
const passport_github2_1 = require("passport-github2");
const express_session_1 = __importDefault(require("express-session"));
const path_1 = __importDefault(require("path"));
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
app.set('trust proxy', 1); // trust first proxy
app.use((0, express_session_1.default)({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
}));
app.use(errorHandler_1.errorHandler);
app.use(checkBlackListedToken_1.checkBlackListedToken);
app.set('views', path_1.default.join(__dirname, 'views'));
app.set('view engine', 'ejs');
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server);
passport_1.default.use(new passport_github2_1.Strategy({
    clientID: process.env.GITHUB_CLIENT_ID || '',
    clientSecret: process.env.GITHUB_CLIENT_SECRET || '',
    callbackURL: process.env.GITHUB_CALLBACK_URL || '',
}, (accessToken, refreshToken, profile, cb) => {
    console.log('accessToken', accessToken);
    console.log('refreshToken', refreshToken);
    console.log('profile information', profile);
    cb(null, profile);
}));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
passport_1.default.serializeUser(function (user, cb) {
    cb(null, user);
});
passport_1.default.deserializeUser(function (id, cb) {
    cb(null, id);
});
app.get('/auth/github', passport_1.default.authenticate('github', { scope: ['user:email'] }));
app.get('/auth/github/callback', passport_1.default.authenticate('github', { failureRedirect: '/' }), function (req, res) {
    res.redirect('/dashboard');
});
app.get('/login', (req, res) => {
    console.log(req.user);
    res.render('login');
});
//healthcheck
app.get('/healthcheck', (_, res) => {
    res.status(200).json({ error: false, message: 'healthcheck' });
});
(0, index_routes_1.initRoutes)(app);
exports.default = app;
