import {Router} from "express";
import {body}  from "express-validator";
import { registerUser,loginUser,logoutUser,getUserProfile,updatePassword,getAllUsers } from "../controllers/userController.js";
import {validateRegister,validateLogin} from '../validators/userValidation.js'
import { protect } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/register",validateRegister,registerUser);
router.post("/login",validateLogin,loginUser);
router.get("/logout",logoutUser);
router.get("/profile",protect,getUserProfile);
router.put("/password",protect,updatePassword);
router.get("/all", getAllUsers);

export default router