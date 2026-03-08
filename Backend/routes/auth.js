import express from 'express';
import { body } from 'express-validator';
import { register, login, getProfile } from '../controllers/authController.js'
import authMiddleware from '../middleware/authmiddleware.js'
import adminMiddleware from '../middleware/adminmiddleware.js';

const router = express.Router();

router.post('/register', [
    body('name').notEmpty().withMessage('name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
], register);

router.post('/login', [
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').notEmpty().withMessage('Password Required'),
], login);

router.get('/profile', authMiddleware, getProfile);

// Admin only - get all users
router.get('/users', authMiddleware, adminMiddleware, async (req, res) => {
    try {
        const users = await User.find().select('-password').sort({ createdAt: -1 });
        res.json({ users });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});
export default router;
