import {body} from 'express-validator'


export const validateAdminRegister = [
    
    body("firstname").isLength({min:3}).withMessage("Firstname is required"),
    body("lastname").isLength({min:3}).withMessage("Lastname is required"),
    body("email").isEmail().withMessage("Email is required"),
    body("password").isLength({min:4}).withMessage("Password is required"),
]

export const validateAdminLogin = [
    body("email").isEmail().withMessage("Email is required"),
    body("password").isLength({min:4}).withMessage("Password is required"),
]