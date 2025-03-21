import {Router} from "express";
import {body}  from "express-validator";
import { registerUser, loginUser, logoutUser, getUserProfile, updatePassword, getAllUsers, updateUserWeight, getUserProfileById } from "../controllers/userController.js";
import {validateRegister,validateLogin} from '../validators/userValidation.js'
import { protect } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/register", validateRegister, registerUser);
router.post("/login", validateLogin, loginUser);
router.get("/logout", logoutUser);
router.get("/profile", protect, getUserProfile);
router.get("/profile/:id", getUserProfileById);
router.put("/password", protect, updatePassword);
router.get("/all", getAllUsers);
router.patch("/:id/weight", protect, updateUserWeight);

export default router