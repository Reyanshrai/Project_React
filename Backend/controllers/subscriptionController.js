import asyncHandler from 'express-async-handler';
import { StatusCodes } from 'http-status-codes';
import User from '../models/userModel.js';

// Mock subscription plans data
const subscriptionPlans = [
  {
    id: 1,
    name: "Basic Fitness",
    price: 29.99,
    features: ["Gym Access", "2 Group Classes/week", "Locker Access"]
  },
  {
    id: 2,
    name: "Premium Fitness",
    price: 49.99,
    features: ["Gym Access 24/7", "Unlimited Group Classes", "Locker Access", "1 PT Session/month"]
  },
  {
    id: 3,
    name: "Elite Fitness",
    price: 79.99,
    features: ["Gym Access 24/7", "Unlimited Group Classes", "Premium Locker", "4 PT Sessions/month", "Nutrition Consultation"]
  }
];

// Get all subscription plans
export const getSubscriptionPlans = asyncHandler(async (req, res) => {
  try {
    console.log("🔹 getSubscriptionPlans function is executing...");
    
    // In a real app, you'd fetch this from a database
    res.status(StatusCodes.OK).json({ plans: subscriptionPlans });
  } catch (error) {
    console.error("🔴 Error in getSubscriptionPlans:", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
});

// Subscribe to a plan
export const subscribeToPlan = asyncHandler(async (req, res) => {
  try {
    console.log("🔹 subscribeToPlan function is executing...");
    const { userId, planId } = req.body;
    
    if (!userId || !planId) {
      return res.status(StatusCodes.BAD_REQUEST).json({ 
        error: 'User ID and Plan ID are required' 
      });
    }
    
    const plan = subscriptionPlans.find(p => p.id === parseInt(planId));
    if (!plan) {
      return res.status(StatusCodes.NOT_FOUND).json({ 
        error: 'Subscription plan not found' 
      });
    }
    
    // MongoDB logic
    const user = await User.findByIdAndUpdate(
      userId,
      {
        subscriptionActive: true,
        subscriptionPlan: plan.name,
        subscriptionExpiry: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
        subscriptionFeatures: plan.features
      },
      { new: true }
    );
    
    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json({ 
        error: 'User not found' 
      });
    }
    
    return res.status(StatusCodes.OK).json({
      message: 'Subscription updated successfully',
      subscription: {
        active: true,
        planId,
        planName: plan.name,
        expiresAt: user.subscriptionExpiry,
        features: plan.features
      }
    });
  } catch (error) {
    console.error("🔴 Error in subscribeToPlan:", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
}); 