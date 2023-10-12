import {Router} from 'express'
import logoutController from '../../controllers/auth/logoutController'
import passport from 'passport'
import {Profile, Strategy as GitHubStrategy} from 'passport-github2'
import User from "../../models/User/User"

passport.use(
    new GitHubStrategy(
        {
            clientID: process.env.GITHUB_CLIENT_ID || '',
            clientSecret: process.env.GITHUB_CLIENT_SECRET || '',
            callbackURL: process.env.GITHUB_CALLBACK_URL || '',
        },
        (accessToken: string, refreshToken: string, profile: any, cb: any) => {
            console.log('accessToken', accessToken)
            console.log('refreshToken', refreshToken)
            console.log('profile information', profile)
            cb(null, profile)
        },
    ),
)

passport.serializeUser(function (user, cb) {
    cb(null, user)
})

passport.deserializeUser(function (id: unknown, cb) {
    cb(null, id as Profile)
})

const router = Router()

router.get('/github', passport.authenticate('github', {scope: ['user:email']}))
router.get('/github/callback', passport.authenticate('github', {failureRedirect: '/'}), (req, res) => {
    console.log('req.user', req.user)
    res.redirect('/')
})

router.get('/logout', logoutController.logout)

export default router
