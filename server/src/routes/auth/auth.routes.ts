import { Router } from 'express'
import registerController from '../../controllers/auth/registerController'
import loginController from '../../controllers/auth/loginController'
import logoutController from '../../controllers/auth/logoutController'

const router = Router()

router.post('/register', registerController.register)
router.post('/login', loginController.login)
router.get('/logout', logoutController.logout)

export default router
