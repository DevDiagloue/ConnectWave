import { Router } from 'express'
import channelController from '../../controllers/channel/channelController'
import { verifyUser } from '../../middleware/verifyUser'

const router = Router()

router.post('/channelCreate', verifyUser, channelController.channelCreate)
router.post('/joinChannel/:channelId', verifyUser, channelController.joinChannel)

export default router
