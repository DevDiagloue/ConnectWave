import { Router } from 'express'
import registerController from '../../controllers/auth/registerController'
import loginController from '../../controllers/auth/loginController'
import logoutController from '../../controllers/auth/logoutController'

const router = Router()

router.post('/register', registerController)
router.post('/login', loginController)
router.get('/logout', logoutController)

export default router
