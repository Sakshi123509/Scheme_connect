import jwt from 'jsonwebtoken';
import User from '../models/user.js';

const authMiddleware = async (req, res, next) => {
    try {
        // 1. Token uthao header se
        const authHeader = req.header('Authorization');
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Access denied. No token provided.' });
        }
        const token = authHeader.split(' ')[1];

        // 2. Token verify karo
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // 3. User DB se lao
        const user = await User.findById(decoded.id).select('-password');
        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }

        // 4. req.user me store karo
        req.user = user;

        // 5. Next route pe jao
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
};

export default authMiddleware;
