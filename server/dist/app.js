'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
//npm packages
const express_1 = __importDefault(require('express'))
const cookie_parser_1 = __importDefault(require('cookie-parser'))
const dotenv_1 = __importDefault(require('dotenv'))
const helmet_1 = __importDefault(require('helmet'))
const compression_1 = __importDefault(require('compression'))
const http_1 = __importDefault(require('http'))
const socket_io_1 = require('socket.io')
const passport_1 = __importDefault(require('passport'))
const express_session_1 = __importDefault(require('express-session'))
const path_1 = __importDefault(require('path'))
const envFile =
  process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development'
dotenv_1.default.config({
  path: envFile,
})
// Custom Modules, Packages, Configs, etc.
const index_routes_1 = require('./routes/index.routes')
const errorHandler_1 = require('./handler/errors/errorHandler')
const checkBlackListedToken_1 = require('./middleware/checkBlackListedToken')
const app = (0, express_1.default)()
app.use(express_1.default.json({ limit: '50kb' }))
app.use(express_1.default.urlencoded({ extended: true }))
app.use((0, cookie_parser_1.default)())
app.use((0, helmet_1.default)())
app.use((0, compression_1.default)())
app.disable('x-powered-by')
app.set('trust proxy', 1) // trust first proxy
app.use(
  (0, express_session_1.default)({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  }),
)
app.use(errorHandler_1.errorHandler)
app.use(checkBlackListedToken_1.checkBlackListedToken)
app.set('views', path_1.default.join(__dirname, 'views'))
app.set('view engine', 'ejs')
const server = http_1.default.createServer(app)
const io = new socket_io_1.Server(server)
app.use(passport_1.default.initialize())
app.use(passport_1.default.session())
//example login for views
app.get('/login', (req, res) => {
  console.log(req.user)
  res.render('login')
})
//healthcheck
app.get('/healthcheck', (_, res) => {
  res.status(200).json({ error: false, message: 'healthcheck' })
})
;(0, index_routes_1.initRoutes)(app)
exports.default = app
