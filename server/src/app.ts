//npm packages
import express, { Application, Response, Request } from 'express'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import helmet from 'helmet'
import compression from 'compression'
import http from 'http'
import { Server } from 'socket.io'

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

app.use(errorHandler)
app.use(checkBlackListedToken)

const server = http.createServer(app)
const io = new Server(server)

//healthcheck
app.get('/healthcheck', (_, res: Response) => {
  res.status(200).json({ error: false, message: 'healthcheck' })
})

initRoutes(app)

export default app
