import mongoose from 'mongoose';

const memberSchema = new mongoose.Schema(
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
        dateOfBirth: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        membership: {
            type: String,
            required: true,
            enum: ['Basic', 'Standard', 'Premium']
        },
        startDate: {
            type: Date,
            required: true,
        },
        endDate: {
            type: Date,
            required: true,
        },
        emergencyContact: {
            name: String,
            phoneNumber: String,
            relationship: String
        },
        status: {
            type: String,
            required: true,
            enum: ['Active', 'Inactive', 'Suspended'],
            default: 'Active'
        }
    },
    {
        timestamps: true,
    }
);

const Member = mongoose.model('Member', memberSchema);

export default Member; 