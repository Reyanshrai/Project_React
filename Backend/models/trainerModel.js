import mongoose from 'mongoose';

const trainerSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        phoneNumber: {
            type: String,
            required: true,
        },
        gender: {
            type: String,
            required: true,
            enum: ['Male', 'Female', 'Other']
        },
        specialization: {
            type: String,
            required: true,
        },
        experience: {
            type: Number,
            required: true,
        },
        workingHours: {
            type: String,
            required: true,
        },
        dateOfBirth: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        certifications: {
            type: [String],
            default: []
        },
        salary: {
            type: Number,
            required: true
        },
        joiningDate: {
            type: Date,
            required: true,
            default: Date.now
        },
        status: {
            type: String,
            required: true,
            enum: ['Active', 'Inactive', 'On Leave'],
            default: 'Active'
        },
        bio: {
            type: String,
            default: ''
        }
    },
    {
        timestamps: true,
    }
);

const Trainer = mongoose.model('Trainer', trainerSchema);

export default Trainer; 