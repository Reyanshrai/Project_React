import Admin from '../models/adminModel.js';
import bcrypt from 'bcrypt';
import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import { StatusCodes } from 'http-status-codes';


const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' });
};


export const adminRegister = asyncHandler(async (req,res) => {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(StatusCodes.BAD_REQUEST);
        throw new Error(errors.array()[0].msg);
    }

    const { firstname,lastname,email, password } = req.body;

    // Check if admin exists
    const adminExists = await Admin.findOne({email});
    if(adminExists){
        res.status(StatusCodes.CONFLICT);
        throw new Error('Admin already exists');
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create admin
    const admin = await Admin.create({
        firstname,
        lastname,
        email,
        password: hashedPassword
    });

    // Generate JWT Token

    const token = generateToken(admin._id);

    // Set token in HTTP-Only Cookie
    res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development', 
        sameSite: 'none',
        maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    res.status(StatusCodes.CREATED).json({
        _id: admin._id,
        email: admin.email,
        token,
    });
})

// Admin Login Controller
export const adminlogin = asyncHandler(async (req, res) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(StatusCodes.BAD_REQUEST);
        throw new Error(errors.array()[0].msg);
    }

    const { email, password } = req.body;

    // Check if admin exists
    const admin = await Admin.findOne({ email });

    if (!admin) {
        res.status(StatusCodes.UNAUTHORIZED);
        throw new Error('Invalid email or password');
    }

    // Compare hashed password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
        res.status(StatusCodes.UNAUTHORIZED);
        throw new Error('Invalid email or password');
    }

    // Generate JWT Token
    const token = generateToken(admin._id);

   
    res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development', 
        sameSite: 'none',
        maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    res.status(StatusCodes.OK).json({
        _id: admin._id,
        email: admin.email,
        token,
    });
});

// Admin Logout Controller
export const adminLogout = asyncHandler(async (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0),
    });
    
    res.status(StatusCodes.OK).json({ message: 'Logged out successfully' });
});
