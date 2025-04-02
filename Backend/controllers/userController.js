import asyncHandler from 'express-async-handler';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import { StatusCodes } from 'http-status-codes';
import User from '../models/userModel.js'; // MongoDB Model
import 'dotenv/config';

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
        const hashedPassword = await bcrypt.hash(password, 10);
        
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

    } catch (error) {
        console.error("🔥 Critical Error in registerUser:", error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
});

// Login User
export const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    
    if (user) {
        const token = generateToken(user._id);
        return res.status(StatusCodes.OK).json({ _id: user._id, firstname: user.firstname, lastname: user.lastname, email: user.email, token });
    }
    return res.status(StatusCodes.UNAUTHORIZED).json({ error: 'Invalid email or password' });
});

// Logout User
export const logoutUser = asyncHandler(async (req, res) => {
    res.clearCookie('jwt');
    res.status(StatusCodes.OK).json({ message: 'Logged out successfully' });
});

// Get User Profile
export const getUserProfile = asyncHandler(async (req, res) => {
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
});

// Get User Profile By ID
export const getUserProfileById = asyncHandler(async (req, res) => {
    try {
        console.log("🔹 getUserProfileById function is executing...");
        const { id } = req.params;
        
        const user = await User.findById(id);
        
        if (!user) {
            return res.status(StatusCodes.NOT_FOUND).json({ error: 'User not found' });
        }
        
        return res.status(StatusCodes.OK).json({
            _id: user._id,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            dateOfBirth: user.dateOfBirth,
            mobileNumber: user.mobileNumber,
            gender: user.gender,
            weight: user.weight,
            subscription: user.subscription,
            subscriptionActive: user.subscriptionActive,
            subscriptionPlan: user.subscriptionPlan,
            subscriptionExpiry: user.subscriptionExpiry,
            subscriptionFeatures: user.subscriptionFeatures,
            dietPlan: user.dietPlan,
            bookedClasses: user.bookedClasses
        });
    } catch (error) {
        console.error("🔴 Error in getUserProfileById:", error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
});

// Update User Weight
export const updateUserWeight = asyncHandler(async (req, res) => {
    try {
        console.log("🔹 updateUserWeight function is executing...");
        const { id } = req.params;
        const { weight } = req.body;
        
        if (!weight) {
            return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Weight is required' });
        }
        
        const user = await User.findByIdAndUpdate(
            id,
            { weight },
            { new: true }
        );
        
        if (!user) {
            return res.status(StatusCodes.NOT_FOUND).json({ error: 'User not found' });
        }
        
        return res.status(StatusCodes.OK).json({
            message: 'Weight updated successfully',
            weight: user.weight
        });
    } catch (error) {
        console.error("🔴 Error in updateUserWeight:", error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
});

// Update User Password
export const updatePassword = asyncHandler(async (req, res) => {
    if (!req.body.newPassword) {
        return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Please provide a new password' });
    }

    const hashedPassword = await bcrypt.hash(req.body.newPassword, 12);
    const user = await User.findById(req.user._id);
    
    if (!user) return res.status(StatusCodes.NOT_FOUND).json({ error: 'User not found' });
    
    user.password = hashedPassword;
    await user.save();

    return res.status(StatusCodes.OK).json({ message: 'Password updated successfully' });
});

// Get all users (for admin dashboard)
export const getAllUsers = asyncHandler(async (req, res) => {
    try {
        console.log("🔹 getAllUsers function is executing...");
        
        const users = await User.find({}).select('-password');
        res.status(StatusCodes.OK).json({ users });
    } catch (error) {
        console.error("🔴 Error in getAllUsers:", error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
});
