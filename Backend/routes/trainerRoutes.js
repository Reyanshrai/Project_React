import { Router } from 'express';
import {
    getAllTrainers,
    addTrainer,
    deleteTrainer,
    getTrainer,
    updateTrainer
} from '../controllers/trainerController.js';

const router = Router();

// Trainer routes
router.get('/', getAllTrainers);
router.post('/', addTrainer);
router.get('/:id', getTrainer);
router.put('/:id', updateTrainer);
router.delete('/:id', deleteTrainer);

export default router; 