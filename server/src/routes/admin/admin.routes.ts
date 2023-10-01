import { Router } from 'express'
import adminController from '../../controllers/admin/adminController'

const router = Router()

router.get('/userById/:id', adminController.getUserById)
router.get('/allUsers', adminController.getAllUsers)
router.put('/userById/:id', adminController.updateUserById)
router.put('/userRole/:id', adminController.updateUserRole)
router.delete('/userById/:id', adminController.deleteUserById)
router.get(
  '/channelInformationById/:id',
  adminController.getChannelInformationById,
)
router.get('/allChannels', adminController.GetAllChannel)

export default router
