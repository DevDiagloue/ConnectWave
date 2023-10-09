import { Router } from 'express'
import registerController from '../../controllers/auth/registerController'
import loginController from '../../controllers/auth/loginController'
import logoutController from '../../controllers/auth/logoutController'
import passport from 'passport'
import { Strategy as GitHubStrategy } from 'passport-github2'

const router = Router()

router.get('/register', registerController.register)
router.post('/login', loginController.login)
router.get('/logout', logoutController.logout)

export default router
