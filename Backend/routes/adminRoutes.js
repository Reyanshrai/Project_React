import {Router} from 'express'
import {validateAdminLogin} from '../validators/adminValidation'
import {Adminlogin} from '../controllers/adminController'

const router = Router()

router.post("/admin-login",validateAdminLogin,Adminlogin)