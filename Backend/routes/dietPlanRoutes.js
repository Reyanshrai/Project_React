import { Router } from "express";
import { getDietPlans, subscribeToDietPlan } from "../controllers/dietPlanController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = Router();

// Get all diet plans
router.get('/', getDietPlans);

// Subscribe to a diet plan
router.post('/subscribe', protect, subscribeToDietPlan);

export default router; 