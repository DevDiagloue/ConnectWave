//npm packages
import express, { Application, Response, Request } from 'express'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import helmet from 'helmet'
import compression from 'compression'
import http from 'http'
import { Server } from 'socket.io'
import passport from 'passport'
import { Strategy as GitHubStrategy, Profile } from 'passport-github2'
import session from 'express-session'
import ejs from 'ejs'
import path from 'path'

const envFile =
  process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development'
dotenv.config({
  path: envFile,
})
// Custom Modules, Packages, Configs, etc.
import { initRoutes } from './routes/index.routes'
import { errorHandler } from './handler/errors/errorHandler'
import { checkBlackListedToken } from './middleware/checkBlackListedToken'

const app: Application = express()
app.use(express.json({ limit: '50kb' }))
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(helmet())
app.use(compression())
app.disable('x-powered-by')
app.set('trust proxy', 1) // trust first proxy
app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  }),
)
app.use(errorHandler)
app.use(checkBlackListedToken)

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

const server = http.createServer(app)
const io = new Server(server)

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID || '',
      clientSecret: process.env.GITHUB_CLIENT_SECRET || '',
      callbackURL: process.env.GITHUB_CALLBACK_URL || '',
    },
    (accessToken: string, refreshToken: string, profile: any, cb: any) => {
      console.log(profile)
      cb(null, profile)
    },
  ),
)

app.use(passport.initialize())
app.use(passport.session())

passport.serializeUser(function (user, cb) {
  cb(null, user)
})

passport.deserializeUser(function (id: unknown, cb) {
  cb(null, id as Profile)
})

app.get(
  '/auth/github',
  passport.authenticate('github', { scope: ['user:email'] }),
)

app.get(
  '/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/' }),
  function (req, res) {
    console.log('kimlik başarılı')
    res.redirect('/dashboard')
  },
)

app.get('/login', (req, res) => {
  console.log(req.user)
  res.render('login')
})

//healthcheck
app.get('/healthcheck', (_, res: Response) => {
  res.status(200).json({ error: false, message: 'healthcheck' })
})

initRoutes(app)

export default app
