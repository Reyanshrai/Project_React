import {Router} from 'express'
import {validateAdminRegister,validateAdminLogin} from '../validators/adminValidation.js'
import {adminRegister,adminlogin,adminLogout} from '../controllers/adminController.js'


const router = Router()

router.post("/register",validateAdminRegister,adminRegister)
router.post("/login",validateAdminLogin,adminlogin)
router.get("/logout",adminLogout)

export default router