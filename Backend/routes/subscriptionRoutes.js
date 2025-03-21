import { Router } from "express";
import { getSubscriptionPlans, subscribeToPlan } from "../controllers/subscriptionController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = Router();

// Get all subscription plans
router.get('/plans', getSubscriptionPlans);

// Subscribe to a plan
router.post('/', protect, subscribeToPlan);

export default router; 