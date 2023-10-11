import {Application, Response} from 'express'
import githubRoutes from './auth/github.routes'
import adminRoutes from './admin/admin.routes'
import channelRoutes from './channel/channel.routes'

export function initRoutes(app: Application) {
    app.use('/api/v1/auth', githubRoutes)
    app.use('/api/v1/admin', adminRoutes)
    app.use('/api/v1/channel', channelRoutes)

    app.all('*', (_, res: Response) => {
        res.status(404).json({
            error: true,
            message: 'Route is not found!',
        })
    })
}
