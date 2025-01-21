import asyncHandler from 'express-async-handler';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import { validationResult } from 'express-validator';
import { StatusCodes } from 'http-status-codes';

// Utility function to generate JWT token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '1d',
    });
};

// @desc    Register new user
// @route   POST /api/users/register
// @access  Public
export const registerUser = asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(StatusCodes.BAD_REQUEST);
        throw new Error(errors.array()[0].msg);
    }

    const { firstname, lastname, email, password, dateOfBirth, mobileNumber, gender } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(StatusCodes.CONFLICT); // Use CONFLICT (409) for duplicate resources
        throw new Error('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
        firstname,
        lastname,
        email,
        password: hashedPassword,
        dateOfBirth,
        mobileNumber,
        gender,
    });

    const token = generateToken(user._id);

    res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'development', // Ensure secure cookies in development
        sameSite: 'none',
        maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    res.status(StatusCodes.CREATED).json({
        _id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        token,
    });
});

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
export const loginUser = asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(StatusCodes.BAD_REQUEST);
        throw new Error(errors.array()[0].msg);
    }

    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
        const token = generateToken(user._id);

        res.cookie('jwt', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'development', // Ensure secure cookies in development
            sameSite: 'none',
            maxAge: 24 * 60 * 60 * 1000, // 1 day
        });

        res.status(StatusCodes.OK).json({
            _id: user._id,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            token,
        });
    } else {
        res.status(StatusCodes.UNAUTHORIZED);
        throw new Error('Invalid email or password');
    }
});

// @desc    Logout user / clear cookie
// @route   GET /api/users/logout
// @access  Private
export const logoutUser = asyncHandler(async (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0),
    });
    res.status(StatusCodes.OK).json({ message: 'Logged out successfully' });
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
export const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
        res.status(StatusCodes.OK).json({
            _id: user._id,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            dateOfBirth: user.dateOfBirth,
            mobileNumber: user.mobileNumber,
            gender: user.gender,
        });
    } else {
        res.status(StatusCodes.NOT_FOUND);
        throw new Error('User not found');
    }
});

// @desc    Update user password
// @route   PUT /api/users/password
// @access  Private
export const updatePassword = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (!user) {
        res.status(StatusCodes.NOT_FOUND);
        throw new Error('User not found');
    }

    if (!req.body.newPassword) {
        res.status(StatusCodes.BAD_REQUEST);
        throw new Error('Please provide new password');
    }

    user.password = await bcrypt.hash(req.body.newPassword, 12);
    await user.save();

    res.status(StatusCodes.OK).json({ message: 'Password updated successfully' });
});