import { Application, Response } from 'express'
import authRoutes from './auth/auth.routes'
import adminRoutes from './admin/admin.routes'

export function initRoutes(app: Application) {
  app.use('/api/v1/auth', authRoutes)
  app.use('/api/v1/admin', adminRoutes)

  app.all('*', (_, res: Response) => {
    res.status(404).json({
      error: true,
      message: 'Route is not found!',
    })
  })
}
