import express from 'express';
import { getUserProfile, updateUserProfile, createUserProfile } from '../controllers/profileController.js';
import authMiddleware from '../middleware/authmiddleware.js';

const router = express.Router();

router.get('/', authMiddleware, getUserProfile);
router.post('/', authMiddleware, createUserProfile);
router.put('/', authMiddleware, updateUserProfile);

export default router;