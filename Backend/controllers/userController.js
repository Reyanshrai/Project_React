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
