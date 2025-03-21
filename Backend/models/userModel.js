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
        // Fitness data fields
        weight: {
            type: Number,
            default: 70
        },
        dailySteps: {
            type: Number,
            default: 0
        },
        caloriesBurned: {
            type: Number,
            default: 0
        },
        heartRate: {
            type: Number,
            default: 0
        },
        workoutName: {
            type: String,
            default: ''
        },
        workoutDuration: {
            type: Number,
            default: 0
        },
        weeklyWorkouts: {
            type: Number,
            default: 0
        },
        // Subscription related fields
        subscriptionActive: {
            type: Boolean,
            default: false
        },
        subscriptionPlan: {
            type: String,
            default: ''
        },
        subscriptionExpiry: {
            type: Date,
            default: null
        },
        subscriptionFeatures: {
            type: [String],
            default: []
        },
        // Diet plan related fields
        dietActive: {
            type: Boolean,
            default: false
        },
        dietPlan: {
            id: {
                type: Number,
                default: null,
            },
            name: {
                type: String,
                default: '',
            },
            startDate: {
                type: Date,
                default: null,
            },
            endDate: {
                type: Date,
                default: null,
            },
        },
        dietDescription: {
            type: String,
            default: ''
        },
        // Booked classes
        bookedClasses: [
            {
                classId: {
                    type: Number,
                    required: true,
                },
                className: {
                    type: String,
                    required: true,
                },
                date: {
                    type: Date,
                    required: true,
                },
                time: {
                    type: String,
                    required: true,
                },
                bookingDate: {
                    type: Date,
                    default: Date.now,
                },
            },
        ],
    },
    {
        timestamps: true,
    }
);

// Password hashing middleware
userSchema.pre('save', async function () {
    if (!this.isModified('password')) return;
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Compare password method
userSchema.methods.comparePassword = async function (candidatePassword) {
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
};

const User = mongoose.model('User', userSchema);

export default User;