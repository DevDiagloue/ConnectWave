//npm packages
import express, { Application, Response, Request } from 'express'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import helmet from 'helmet'
import compression from 'compression'

const envFile =
  process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development'
dotenv.config({
  path: envFile,
})
// Custom Modules, Packages, Configs, etc.
import { initRoutes } from './routes/index.routes'
import { errorHandler } from './handler/errors/errorHandler'

const app: Application = express()
app.use(express.json({ limit: '10kb' }))
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(helmet())
app.use(compression())
app.disable('x-powered-by')
app.use(errorHandler)


//healthcheck
app.get('/healthcheck', (_, res: Response) => {
  res.status(200).json({ error: false, message: 'healthcheck' })
})

initRoutes(app)

export default app
