import {body} from 'express-validator'

export const validateAdminLogin = [
    body("email").isEmail().withMessage("Email is required"),
    body("password").isLength({min:4}).withMessage("Password is required")
]