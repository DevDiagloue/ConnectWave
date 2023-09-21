import { Router } from 'express'
import channelController from '../../controllers/channel/channelController'
import { verifyUser } from '../../middleware/verifyUser'

const router = Router()

router.post('/channelCreate', verifyUser, channelController.channelCreate)
router.post(
  '/joinChannel/:channelId',
  verifyUser,
  channelController.joinChannel,
)
router.post(
  '/sendMessageChannel/:channelId',
  verifyUser,
  channelController.sendMessageChannel,
)

router.post(
  '/leaveChannel/:channelId',
  verifyUser,
  channelController.leaveChannel,
)

router.delete(
  '/deleteChannel/:channelId',
  verifyUser,
  channelController.deleteChannel,
)

export default router
