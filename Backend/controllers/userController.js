import asyncHandler from 'express-async-handler';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import { StatusCodes } from 'http-status-codes';
import User from '../models/userModel.js'; // MongoDB Model
import {pool} from '../database/postgreDb.js'; // PostgreSQL Pool
import 'dotenv/config';

const DB_TYPE = process.env.DB_TYPE.trim().toLowerCase();

// Generate JWT Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

// Register User
export const registerUser = asyncHandler(async (req, res) => {
    try {
        console.log("🔹 registerUser function is executing...");

        // Validate request body
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.error("🔴 Validation error:", errors.array());
            return res.status(StatusCodes.BAD_REQUEST).json({ error: errors.array()[0].msg });
        }

        // Extract user details from request body
        const { firstname, lastname, email, password, dateOfBirth, mobileNumber, gender } = req.body;
        console.log("📥 Received user data:", { firstname, lastname, email, dateOfBirth, mobileNumber, gender });

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 12);
        
        if (!process.env.DB_TYPE) {
            throw new Error("❌ DB_TYPE is not defined in the environment variables.");
        }

        const DB_TYPE = process.env.DB_TYPE.trim().toLowerCase();
        console.log("✅ Processed DB_TYPE:", DB_TYPE);

        if (DB_TYPE === 'mongo') {
            console.log("📌 MongoDB Logic Executing...");

            const userExists = await User.findOne({ email });
            if (userExists) {
                console.error("⚠️ User already exists in MongoDB.");
                return res.status(StatusCodes.CONFLICT).json({ error: 'User already exists' });
            }

            const user = await User.create({ firstname, lastname, email, password: hashedPassword, dateOfBirth, mobileNumber, gender });
            const token = generateToken(user._id);

            console.log("✅ User successfully registered in MongoDB:", user);
            return res.status(StatusCodes.CREATED).json({ _id: user._id, firstname, lastname, email, token });

        } else if (DB_TYPE === 'postgres') {
            console.log("📌 PostgreSQL Logic Executing...");

            const client = await pool.connect();
            try {
                const userExists = await client.query('SELECT * FROM users WHERE email = $1', [email]);
                if (userExists.rows.length) {
                    console.error("⚠️ User already exists in PostgreSQL.");
                    return res.status(StatusCodes.CONFLICT).json({ error: 'User already exists' });
                }

                const result = await client.query(
                    'INSERT INTO users (firstname, lastname, email, password, date_of_birth, mobile_number, gender) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id, firstname, lastname, email',
                    [firstname, lastname, email, hashedPassword, dateOfBirth, mobileNumber, gender]
                );

                const user = result.rows[0];
                const token = generateToken(user.id);

                console.log("✅ User successfully registered in PostgreSQL:", user);
                return res.status(StatusCodes.CREATED).json({ _id: user.id, firstname: user.firstname, lastname: user.lastname, email: user.email, token });

            } catch (error) {
                console.error("❌ PostgreSQL error:", error);
                return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Database error' });
            } finally {
                client.release();
            }

        } else {
            throw new Error(`❌ Invalid DB_TYPE: '${DB_TYPE}'. Expected 'mongo' or 'postgres'.`);
        }

    } catch (error) {
        console.error("🔥 Critical Error in registerUser:", error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
});
// Login User
export const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (DB_TYPE === 'mongo') {
        // ✅ MongoDB Logic
        const user = await User.findOne({ email });
        if (user && (await bcrypt.compare(password, user.password))) {
            const token = generateToken(user._id);
            return res.status(StatusCodes.OK).json({ _id: user._id, firstname: user.firstname, lastname: user.lastname, email: user.email, token });
        }
        return res.status(StatusCodes.UNAUTHORIZED).json({ error: 'Invalid email or password' });
    } else {
        // ✅ PostgreSQL Logic
        const client = await pool.connect();
        try {
            const userResult = await client.query('SELECT * FROM users WHERE email = $1', [email]);
            if (!userResult.rows.length) return res.status(StatusCodes.UNAUTHORIZED).json({ error: 'Invalid email or password' });

            const user = userResult.rows[0];
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch) return res.status(StatusCodes.UNAUTHORIZED).json({ error: 'Invalid email or password' });

            const token = generateToken(user.id);
            return res.status(StatusCodes.OK).json({ _id: user.id, firstname: user.firstname, lastname: user.lastname, email: user.email, token });
        } catch (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Database error' });
        } finally {
            client.release();
        }
    }
});

// Logout User
export const logoutUser = asyncHandler(async (req, res) => {
    res.clearCookie('jwt');
    res.status(StatusCodes.OK).json({ message: 'Logged out successfully' });
});

// Get User Profile
export const getUserProfile = asyncHandler(async (req, res) => {
    if (DB_TYPE === 'mongo') {
        // ✅ MongoDB Logic
        const user = await User.findById(req.user._id);
        if (user) {
            return res.status(StatusCodes.OK).json({
                _id: user._id,
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                dateOfBirth: user.dateOfBirth,
                mobileNumber: user.mobileNumber,
                gender: user.gender,
            });
        }
        return res.status(StatusCodes.NOT_FOUND).json({ error: 'User not found' });
    } else {
        // ✅ PostgreSQL Logic
        const client = await pool.connect();
        try {
            const userResult = await client.query('SELECT id, firstname, lastname, email, date_of_birth, mobile_number, gender FROM users WHERE id = $1', [req.user.id]);
            if (!userResult.rows.length) return res.status(StatusCodes.NOT_FOUND).json({ error: 'User not found' });

            return res.status(StatusCodes.OK).json(userResult.rows[0]);
        } catch (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Database error' });
        } finally {
            client.release();
        }
    }
});

// Update User Password
export const updatePassword = asyncHandler(async (req, res) => {
    if (!req.body.newPassword) {
        return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Please provide a new password' });
    }

    const hashedPassword = await bcrypt.hash(req.body.newPassword, 12);

    if (DB_TYPE === 'mongo') {
        // ✅ MongoDB Logic
        const user = await User.findById(req.user._id);
        if (!user) return res.status(StatusCodes.NOT_FOUND).json({ error: 'User not found' });

        user.password = hashedPassword;
        await user.save();

        return res.status(StatusCodes.OK).json({ message: 'Password updated successfully' });
    } else {
        // ✅ PostgreSQL Logic
        const client = await pool.connect();
        try {
            const userResult = await client.query('UPDATE users SET password = $1 WHERE id = $2 RETURNING id', [hashedPassword, req.user.id]);
            if (!userResult.rows.length) return res.status(StatusCodes.NOT_FOUND).json({ error: 'User not found' });

            return res.status(StatusCodes.OK).json({ message: 'Password updated successfully' });
        } catch (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Database error' });
        } finally {
            client.release();
        }
    }
});

// Get all users (for admin dashboard)
export const getAllUsers = asyncHandler(async (req, res) => {
    try {
        console.log("🔹 getAllUsers function is executing...");
        
        let users = [];
        
        if (DB_TYPE === 'mongo') {
            users = await User.find({}).select('-password');
        } else if (DB_TYPE === 'postgres') {
            const { rows } = await pool.query(
                'SELECT id, firstname, lastname, email, date_of_birth, mobile_number, gender FROM users'
            );
            
            users = rows.map(user => ({
                ...user,
                createdAt: new Date().toISOString()
            }));
        }
        
        res.status(StatusCodes.OK).json({ users });
    } catch (error) {
        console.error("🔴 Error in getAllUsers:", error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
});

// Get User Profile by ID (for dashboard)
export const getUserProfileById = asyncHandler(async (req, res) => {
    try {
        console.log("🔹 getUserProfileById function is executing...");
        const userId = req.params.id;
        
        if (!userId) {
            return res.status(StatusCodes.BAD_REQUEST).json({ error: 'User ID is required' });
        }
        
        let user;
        
        if (DB_TYPE === 'mongo') {
            user = await User.findById(userId);
            
            if (!user) {
                return res.status(StatusCodes.NOT_FOUND).json({ error: 'User not found' });
            }
            
            // Add mock fitness data for now - in a real app, this would be fetched from the database
            const userData = {
                _id: user._id,
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                dateOfBirth: user.dateOfBirth,
                mobileNumber: user.mobileNumber,
                gender: user.gender,
                // Fitness data
                weight: user.weight || 70,
                stats: {
                    dailySteps: user.dailySteps || 8500,
                    caloriesBurned: user.caloriesBurned || 450,
                    heartRate: user.heartRate || 72
                },
                workout: {
                    name: user.workoutName || "Upper Body Strength",
                    duration: user.workoutDuration || 45
                },
                progress: {
                    weeklyWorkouts: user.weeklyWorkouts || 3
                },
                subscription: {
                    active: user.subscriptionActive || true,
                    planName: user.subscriptionPlan || "Basic Fitness",
                    expiresAt: user.subscriptionExpiry || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
                    features: user.subscriptionFeatures || ["Gym Access", "2 Group Classes/week", "Locker Access"]
                },
                dietPlan: {
                    active: user.dietActive || false,
                    planName: user.dietPlan || "",
                    description: user.dietDescription || ""
                }
            };
            
            return res.status(StatusCodes.OK).json(userData);
        } else {
            // PostgreSQL logic
            const client = await pool.connect();
            try {
                const userResult = await client.query(
                    'SELECT id, firstname, lastname, email, date_of_birth, mobile_number, gender FROM users WHERE id = $1',
                    [userId]
                );
                
                if (!userResult.rows.length) {
                    return res.status(StatusCodes.NOT_FOUND).json({ error: 'User not found' });
                }
                
                user = userResult.rows[0];
                
                // Add mock fitness data
                const userData = {
                    ...user,
                    weight: 70,
                    stats: {
                        dailySteps: 8500,
                        caloriesBurned: 450,
                        heartRate: 72
                    },
                    workout: {
                        name: "Upper Body Strength",
                        duration: 45
                    },
                    progress: {
                        weeklyWorkouts: 3
                    },
                    subscription: {
                        active: true,
                        planName: "Basic Fitness",
                        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
                        features: ["Gym Access", "2 Group Classes/week", "Locker Access"]
                    },
                    dietPlan: {
                        active: false,
                        planName: "",
                        description: ""
                    }
                };
                
                return res.status(StatusCodes.OK).json(userData);
            } catch (error) {
                console.error("🔴 Error in getUserProfileById PostgreSQL:", error);
                return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Database error' });
            } finally {
                client.release();
            }
        }
    } catch (error) {
        console.error("🔴 Error in getUserProfileById:", error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
});

// Update User Weight
export const updateUserWeight = asyncHandler(async (req, res) => {
    try {
        console.log("🔹 updateUserWeight function is executing...");
        const userId = req.params.id;
        const { weight } = req.body;
        
        if (!userId || !weight) {
            return res.status(StatusCodes.BAD_REQUEST).json({ error: 'User ID and weight are required' });
        }
        
        if (DB_TYPE === 'mongo') {
            const user = await User.findByIdAndUpdate(
                userId,
                { weight },
                { new: true }
            );
            
            if (!user) {
                return res.status(StatusCodes.NOT_FOUND).json({ error: 'User not found' });
            }
            
            return res.status(StatusCodes.OK).json({ message: 'Weight updated successfully', weight });
        } else {
            // PostgreSQL logic
            const client = await pool.connect();
            try {
                // Check if the weight column exists, if not add it
                const checkColumn = await client.query(`
                    SELECT column_name FROM information_schema.columns 
                    WHERE table_name = 'users' AND column_name = 'weight'
                `);
                
                if (checkColumn.rows.length === 0) {
                    await client.query(`ALTER TABLE users ADD COLUMN weight NUMERIC`);
                }
                
                const result = await client.query(
                    'UPDATE users SET weight = $1 WHERE id = $2 RETURNING id, weight',
                    [weight, userId]
                );
                
                if (!result.rows.length) {
                    return res.status(StatusCodes.NOT_FOUND).json({ error: 'User not found' });
                }
                
                return res.status(StatusCodes.OK).json({ 
                    message: 'Weight updated successfully', 
                    weight: result.rows[0].weight 
                });
            } catch (error) {
                console.error("🔴 Error in updateUserWeight PostgreSQL:", error);
                return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Database error' });
            } finally {
                client.release();
            }
        }
    } catch (error) {
        console.error("🔴 Error in updateUserWeight:", error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
});
