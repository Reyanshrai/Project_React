import {Router} from 'express'
import {validateAdminRegister,validateAdminLogin} from '../validators/adminValidation.js'
import {adminRegister,adminlogin} from '../controllers/adminController.js'


const router = Router()

router.post("/register",validateAdminRegister,adminRegister)
router.post("/login",validateAdminLogin,adminlogin)

export default router