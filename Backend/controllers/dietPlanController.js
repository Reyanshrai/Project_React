import asyncHandler from 'express-async-handler';
import { StatusCodes } from 'http-status-codes';
import User from '../models/userModel.js';
import { pool } from '../database/postgreDb.js';

// Get DB type from environment
const DB_TYPE = process.env.DB_TYPE?.trim().toLowerCase() || 'mongo';

// Mock diet plans data
const dietPlans = [
  {
    id: 1,
    name: "Weight Loss Plan",
    description: "A calorie-deficit diet plan focused on lean proteins and vegetables",
    price: 19.99,
    duration: 30, // days
    meals: [
      { type: "Breakfast", options: ["Egg white omelette", "Oatmeal with berries", "Greek yogurt with fruits"] },
      { type: "Lunch", options: ["Grilled chicken salad", "Quinoa bowl", "Tuna wrap"] },
      { type: "Dinner", options: ["Baked salmon with vegetables", "Turkey stir-fry", "Vegetable soup with lean protein"] }
    ]
  },
  {
    id: 2,
    name: "Muscle Building Plan",
    description: "High protein diet plan designed to support muscle growth and recovery",
    price: 24.99,
    duration: 30, // days
    meals: [
      { type: "Breakfast", options: ["Protein pancakes", "Eggs and whole grain toast", "Protein smoothie"] },
      { type: "Lunch", options: ["Chicken and rice bowl", "Beef and vegetable stir-fry", "Salmon with sweet potatoes"] },
      { type: "Dinner", options: ["Grilled steak with vegetables", "Chicken pasta", "Fish with quinoa and vegetables"] }
    ]
  },
  {
    id: 3,
    name: "Vegetarian Plan",
    description: "Balanced vegetarian diet with complete proteins and essential nutrients",
    price: 21.99,
    duration: 30, // days
    meals: [
      { type: "Breakfast", options: ["Avocado toast with eggs", "Vegetable omelette", "Fruit smoothie with plant protein"] },
      { type: "Lunch", options: ["Lentil soup", "Quinoa salad", "Falafel wrap"] },
      { type: "Dinner", options: ["Vegetable curry with tofu", "Bean and vegetable stir-fry", "Eggplant parmesan"] }
    ]
  }
];

// Get all diet plans
export const getDietPlans = asyncHandler(async (req, res) => {
  try {
    console.log("🔹 getDietPlans function is executing...");
    
    // In a real app, you'd fetch this from a database
    res.status(StatusCodes.OK).json({ plans: dietPlans });
  } catch (error) {
    console.error("🔴 Error in getDietPlans:", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
});

// Subscribe to a diet plan
export const subscribeToDietPlan = asyncHandler(async (req, res) => {
  try {
    console.log("🔹 subscribeToDietPlan function is executing...");
    const { planId } = req.body;
    const userId = req.user.id; // From auth middleware
    
    if (!planId) {
      return res.status(StatusCodes.BAD_REQUEST).json({ 
        error: 'Plan ID is required' 
      });
    }
    
    const plan = dietPlans.find(p => p.id === parseInt(planId));
    if (!plan) {
      return res.status(StatusCodes.NOT_FOUND).json({ 
        error: 'Diet plan not found' 
      });
    }
    
    if (DB_TYPE === 'mongo') {
      // MongoDB logic
      const user = await User.findByIdAndUpdate(
        userId,
        {
          dietPlan: {
            id: plan.id,
            name: plan.name,
            startDate: new Date(),
            endDate: new Date(Date.now() + plan.duration * 24 * 60 * 60 * 1000)
          }
        },
        { new: true }
      );
      
      if (!user) {
        return res.status(StatusCodes.NOT_FOUND).json({ 
          error: 'User not found' 
        });
      }
      
      return res.status(StatusCodes.OK).json({
        message: 'Successfully subscribed to diet plan',
        dietPlan: {
          id: plan.id,
          name: plan.name,
          startDate: user.dietPlan.startDate,
          endDate: user.dietPlan.endDate,
          meals: plan.meals
        }
      });
    } else {
      // PostgreSQL logic
      const client = await pool.connect();
      try {
        // Check if diet plan columns exist, if not add them
        const checkColumns = await client.query(`
          SELECT column_name FROM information_schema.columns 
          WHERE table_name = 'users' AND column_name IN (
            'diet_plan_id', 'diet_plan_name', 'diet_plan_start_date', 'diet_plan_end_date'
          )
        `);
        
        if (checkColumns.rows.length < 4) {
          await client.query(`
            ALTER TABLE users 
            ADD COLUMN IF NOT EXISTS diet_plan_id INTEGER DEFAULT NULL,
            ADD COLUMN IF NOT EXISTS diet_plan_name TEXT DEFAULT '',
            ADD COLUMN IF NOT EXISTS diet_plan_start_date TIMESTAMP DEFAULT NULL,
            ADD COLUMN IF NOT EXISTS diet_plan_end_date TIMESTAMP DEFAULT NULL
          `);
        }
        
        const startDate = new Date();
        const endDate = new Date(Date.now() + plan.duration * 24 * 60 * 60 * 1000);
        
        const result = await client.query(
          `UPDATE users 
           SET diet_plan_id = $1, 
               diet_plan_name = $2, 
               diet_plan_start_date = $3,
               diet_plan_end_date = $4
           WHERE id = $5 
           RETURNING id, diet_plan_id, diet_plan_name, diet_plan_start_date, diet_plan_end_date`,
          [plan.id, plan.name, startDate, endDate, userId]
        );
        
        if (!result.rows.length) {
          return res.status(StatusCodes.NOT_FOUND).json({ 
            error: 'User not found' 
          });
        }
        
        const user = result.rows[0];
        
        return res.status(StatusCodes.OK).json({
          message: 'Successfully subscribed to diet plan',
          dietPlan: {
            id: user.diet_plan_id,
            name: user.diet_plan_name,
            startDate: user.diet_plan_start_date,
            endDate: user.diet_plan_end_date,
            meals: plan.meals
          }
        });
      } catch (error) {
        console.error("🔴 Error in subscribeToDietPlan PostgreSQL:", error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ 
          error: 'Database error' 
        });
      } finally {
        client.release();
      }
    }
  } catch (error) {
    console.error("🔴 Error in subscribeToDietPlan:", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
}); 