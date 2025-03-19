import Trainer from '../models/trainerModel.js';
import asyncHandler from 'express-async-handler';
import { validationResult } from 'express-validator';
import { StatusCodes } from 'http-status-codes';

// Get all trainers
export const getAllTrainers = asyncHandler(async (req, res) => {
    try {
        console.log("🔹 getAllTrainers function is executing...");
        
        const trainers = await Trainer.find({});
        
        res.status(StatusCodes.OK).json({ trainers });
    } catch (error) {
        console.error("🔴 Error in getAllTrainers:", error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
});

// Add a new trainer
export const addTrainer = asyncHandler(async (req, res) => {
    try {
        console.log("🔹 addTrainer function is executing...");
        
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
            specialization,
            experience,
            workingHours,
            dateOfBirth,
            address,
            certifications,
            salary,
            joiningDate,
            status,
            bio
        } = req.body;
        
        // Check if trainer with email already exists
        const trainerExists = await Trainer.findOne({ email });
        if (trainerExists) {
            res.status(StatusCodes.CONFLICT);
            throw new Error('Trainer with this email already exists');
        }
        
        // Create new trainer
        const trainer = await Trainer.create({
            fullName,
            email,
            phoneNumber,
            gender,
            specialization,
            experience,
            workingHours,
            dateOfBirth,
            address,
            certifications: certifications || [],
            salary,
            joiningDate: joiningDate || new Date(),
            status: status || 'Active',
            bio: bio || ''
        });
        
        res.status(StatusCodes.CREATED).json({ trainer });
    } catch (error) {
        console.error("🔴 Error in addTrainer:", error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
});

// Get a specific trainer
export const getTrainer = asyncHandler(async (req, res) => {
    try {
        console.log("🔹 getTrainer function is executing...");
        
        const { id } = req.params;
        
        // Find trainer
        const trainer = await Trainer.findById(id);
        if (!trainer) {
            res.status(StatusCodes.NOT_FOUND);
            throw new Error('Trainer not found');
        }
        
        res.status(StatusCodes.OK).json({ trainer });
    } catch (error) {
        console.error("🔴 Error in getTrainer:", error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
});

// Update a trainer
export const updateTrainer = asyncHandler(async (req, res) => {
    try {
        console.log("🔹 updateTrainer function is executing...");
        
        const { id } = req.params;
        
        // Check if trainer exists
        const trainer = await Trainer.findById(id);
        if (!trainer) {
            res.status(StatusCodes.NOT_FOUND);
            throw new Error('Trainer not found');
        }
        
        // Update trainer
        const updatedTrainer = await Trainer.findByIdAndUpdate(
            id,
            req.body,
            { new: true, runValidators: true }
        );
        
        res.status(StatusCodes.OK).json({ trainer: updatedTrainer });
    } catch (error) {
        console.error("🔴 Error in updateTrainer:", error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
});

// Delete a trainer
export const deleteTrainer = asyncHandler(async (req, res) => {
    try {
        console.log("🔹 deleteTrainer function is executing...");
        
        const { id } = req.params;
        
        // Check if trainer exists
        const trainer = await Trainer.findById(id);
        if (!trainer) {
            res.status(StatusCodes.NOT_FOUND);
            throw new Error('Trainer not found');
        }
        
        // Delete trainer
        await Trainer.findByIdAndDelete(id);
        
        res.status(StatusCodes.OK).json({ message: 'Trainer deleted successfully' });
    } catch (error) {
        console.error("🔴 Error in deleteTrainer:", error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
}); 