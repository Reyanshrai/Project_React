import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema(
    {
        firstname: {
            type: String,
            required: true,
        },
        lastname: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        dateOfBirth: {
            type: String,
            required: true,
        },
        mobileNumber: {
            type: String,
            required: true,
        },
        gender: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);


const User = mongoose.model('User', userSchema);

export default User;