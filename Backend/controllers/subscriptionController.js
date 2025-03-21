import asyncHandler from 'express-async-handler';
import { StatusCodes } from 'http-status-codes';
import User from '../models/userModel.js';
import { pool } from '../database/postgreDb.js';

// Get DB type from environment
const DB_TYPE = process.env.DB_TYPE?.trim().toLowerCase() || 'mongo';

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
    
    if (DB_TYPE === 'mongo') {
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
    } else {
      // PostgreSQL logic
      const client = await pool.connect();
      try {
        // Check if subscription columns exist, if not add them
        const checkColumns = await client.query(`
          SELECT column_name FROM information_schema.columns 
          WHERE table_name = 'users' AND column_name IN (
            'subscription_active', 'subscription_plan', 'subscription_expiry'
          )
        `);
        
        if (checkColumns.rows.length < 3) {
          await client.query(`
            ALTER TABLE users 
            ADD COLUMN IF NOT EXISTS subscription_active BOOLEAN DEFAULT false,
            ADD COLUMN IF NOT EXISTS subscription_plan TEXT DEFAULT '',
            ADD COLUMN IF NOT EXISTS subscription_expiry TIMESTAMP DEFAULT NULL
          `);
        }
        
        const expiryDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days from now
        
        const result = await client.query(
          `UPDATE users 
           SET subscription_active = true, 
               subscription_plan = $1, 
               subscription_expiry = $2 
           WHERE id = $3 
           RETURNING id, subscription_active, subscription_plan, subscription_expiry`,
          [plan.name, expiryDate, userId]
        );
        
        if (!result.rows.length) {
          return res.status(StatusCodes.NOT_FOUND).json({ 
            error: 'User not found' 
          });
        }
        
        const user = result.rows[0];
        
        return res.status(StatusCodes.OK).json({
          message: 'Subscription updated successfully',
          subscription: {
            active: user.subscription_active,
            planId,
            planName: user.subscription_plan,
            expiresAt: user.subscription_expiry,
            features: plan.features
          }
        });
      } catch (error) {
        console.error("🔴 Error in subscribeToPlan PostgreSQL:", error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ 
          error: 'Database error' 
        });
      } finally {
        client.release();
      }
    }
  } catch (error) {
    console.error("🔴 Error in subscribeToPlan:", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
}); 