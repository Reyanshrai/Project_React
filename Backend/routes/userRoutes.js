import {Router} from "express";
import {body}  from "express-validator";
import { registerUser, loginUser, logoutUser, getUserProfile, updatePassword } from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/register",  
    [
        body("firstname").notEmpty().trim().withMessage("First name is required"),
        body("lastname").notEmpty().trim().withMessage("Last name is required"),
        body("email").isEmail().withMessage("Email is required"),
        body("password").isStrongPassword().isLength({ min: 4 }).withMessage("Password is required"),
        body("dateOfBirth").isDate().withMessage("Date of birth is required and must be a valid date"),
        body("mobileNumber").matches(/^[0-9]{10}$/).withMessage("Mobile number must be 10 digits"),
        body("gender").isIn(["male", "female", "other"]).withMessage("Gender is required"),
    ],registerUser);

router.post("/login",
    [
        body("email").isEmail().withMessage("Email is required"),
        body("password").isStrongPassword().isLength({ min: 4 }).withMessage("Password is required"),
    ],
    loginUser);
router.get("/logout",logoutUser);
router.get("/profile",protect,getUserProfile);
router.put("/password",protect,updatePassword);

export default router