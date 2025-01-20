import {body} from 'express-validator'

export const validateRegister = [
    body("firstname").notEmpty().trim().withMessage("First name is required"),
    body("lastname").notEmpty().trim().withMessage("Last name is required"),
    body("email").isEmail().withMessage("Email is required"),
    body("password").isLength({min:4}).withMessage("Password must be at least 4 characters long"),
    body("dateOfBirth").isDate().withMessage("Date of birth is required and must be a valid date"),
    body("mobileNumber").matches(/^[0-9]{10}$/).withMessage("Mobile number must be 10 digits"),
    body("gender").isIn(["male", "female", "other"]).withMessage("Gender is required"),
]

export const validateLogin = [
    body("email").isEmail().withMessage("Email is required"),
    body("password").isLength({min:4}).withMessage("Password is required")
]