import { Router } from 'express';
import {
    getAllMembers,
    addMember,
    deleteMember,
    getMember,
    updateMember
} from '../controllers/memberController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = Router();

// Member routes
router.get('/', getAllMembers);
router.post('/', addMember);
router.get('/:id', getMember);
router.put('/:id', updateMember);
router.delete('/:id', deleteMember);

export default router; 