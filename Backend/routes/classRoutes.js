import { Router } from "express";
import { getUpcomingClasses, bookClass } from "../controllers/classController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = Router();

// Get upcoming classes
router.get('/upcoming', getUpcomingClasses);

// Book a class
router.post('/book', protect, bookClass);

export default router; 