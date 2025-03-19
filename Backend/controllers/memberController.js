import Member from '../models/memberModel.js';
import asyncHandler from 'express-async-handler';
import { validationResult } from 'express-validator';
import { StatusCodes } from 'http-status-codes';

// Get all members
export const getAllMembers = asyncHandler(async (req, res) => {
    try {
        console.log("🔹 getAllMembers function is executing...");
        
        const members = await Member.find({});
        
        res.status(StatusCodes.OK).json({ members });
    } catch (error) {
        console.error("🔴 Error in getAllMembers:", error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
});

// Add a new member
export const addMember = asyncHandler(async (req, res) => {
    try {
        console.log("🔹 addMember function is executing...");
        
        // Validate request
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(StatusCodes.BAD_REQUEST);
            throw new Error(errors.array()[0].msg);
        }
        
        const {
            fullName,
            email,
            phoneNumber,
            gender,
            dateOfBirth,
            address,
            membership,
            startDate,
            endDate,
            emergencyContact,
            status
        } = req.body;
        
        // Check if member with email already exists
        const memberExists = await Member.findOne({ email });
        if (memberExists) {
            res.status(StatusCodes.CONFLICT);
            throw new Error('Member with this email already exists');
        }
        
        // Create new member
        const member = await Member.create({
            fullName,
            email,
            phoneNumber,
            gender,
            dateOfBirth,
            address,
            membership,
            startDate,
            endDate,
            emergencyContact,
            status: status || 'Active'
        });
        
        res.status(StatusCodes.CREATED).json({ member });
    } catch (error) {
        console.error("🔴 Error in addMember:", error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
});

// Delete a member
export const deleteMember = asyncHandler(async (req, res) => {
    try {
        console.log("🔹 deleteMember function is executing...");
        
        const { id } = req.params;
        
        // Check if member exists
        const member = await Member.findById(id);
        if (!member) {
            res.status(StatusCodes.NOT_FOUND);
            throw new Error('Member not found');
        }
        
        // Delete member
        await Member.findByIdAndDelete(id);
        
        res.status(StatusCodes.OK).json({ message: 'Member deleted successfully' });
    } catch (error) {
        console.error("🔴 Error in deleteMember:", error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
});

// Get a specific member
export const getMember = asyncHandler(async (req, res) => {
    try {
        console.log("🔹 getMember function is executing...");
        
        const { id } = req.params;
        
        // Find member
        const member = await Member.findById(id);
        if (!member) {
            res.status(StatusCodes.NOT_FOUND);
            throw new Error('Member not found');
        }
        
        res.status(StatusCodes.OK).json({ member });
    } catch (error) {
        console.error("🔴 Error in getMember:", error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
});

// Update a member
export const updateMember = asyncHandler(async (req, res) => {
    try {
        console.log("🔹 updateMember function is executing...");
        
        const { id } = req.params;
        
        // Check if member exists
        const member = await Member.findById(id);
        if (!member) {
            res.status(StatusCodes.NOT_FOUND);
            throw new Error('Member not found');
        }
        
        // Update member
        const updatedMember = await Member.findByIdAndUpdate(
            id,
            req.body,
            { new: true, runValidators: true }
        );
        
        res.status(StatusCodes.OK).json({ member: updatedMember });
    } catch (error) {
        console.error("🔴 Error in updateMember:", error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
}); 