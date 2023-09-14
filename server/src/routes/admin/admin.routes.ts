import { Router } from 'express'
import adminController from '../../controllers/admin/adminController'

const router = Router()

router.get('/getUserById/:id', adminController.getUserById)
router.get('/getAllUsers', adminController.getAllUsers)
router.put('/updateUserById/:id', adminController.updateUserById)
router.put('/updateUserRole/:id', adminController.updateUserRole)
router.delete('/deleteUserById/:id', adminController.deleteUserById)
router.get(
  '/getChannelInformationById/:id',
  adminController.getChannelInformationById,
)

export default router
