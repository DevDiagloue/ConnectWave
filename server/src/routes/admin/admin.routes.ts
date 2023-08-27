import { Router } from 'express'
import adminController from '../../controllers/admin/adminController'

const router = Router()

router.get('/getUserById/:id', adminController.getUserById)

export default router
