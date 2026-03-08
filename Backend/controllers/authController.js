import jwt from 'jsonwebtoken';
import { hash, compare } from 'bcryptjs';
import { validationResult } from 'express-validator';
import User from '../models/user.js';

export const register = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await hash(password, 10);
        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.status(201).json({
            message: 'User created successfully',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

export const login = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Badlo isko:
        const token = jwt.sign(
            { id: user._id, role: user.role },  // ✅ role add karo
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.json({
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

export const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('-password');
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};



// export const signup = async (req, res) => {
//     try {
//         const errors = validationResult(req);
//         if (!errors.isEmpty()) {
//             return res.status(400).json({ errors: errors.array() });
//         }

//         const { name, email, password, age, income, category, location, gender, occupation } = req.body;

//         const existingUser = await User.findOne({ email });
//         if (existingUser) {
//             return res.status(400).json({ message: 'User already exists' });
//         }

//         const hashedPassword = await hash(password, 10);

//         const user = new User({
//             name,
//             email,
//             password: hashedPassword,
//             age,
//             income,
//             category,
//             location,
//             gender,
//             occupation
//         });

//         await user.save();

//         const token = jwt.sign(
//             { id: user._id },
//             process.env.JWT_SECRET,
//             { expiresIn: '7d' }
//         );

//         res.status(201).json({
//             message: 'User created successfully',
//             token,
//             user: {
//                 id: user._id,
//                 name: user.name,
//                 email: user.email
//             }
//         });

//     } catch (error) {
//         res.status(500).json({ message: 'Server error' });
//     }
// };
// export const login = async (req, res) => {
//     try {
//         const errors = validationResult(req);
//         if (!errors.isEmpty()) {
//             return res.status(400).json({ errors: errors.array() });
//         }
//         const { email, password } = req.body;

//         const user = await User.findOne({ email });
//         if (!user) {
//             return res.status(400).json({ message: 'Invalid credentials' });
//         }
//         const isMatch = await compare(password, user.password);
//         if (!isMatch) {
//             return res.status(400).json({ message: 'Invalid credentials' });
//         }
//         const token = jwt.sign(
//             { id: user._id },
//             process.env.JWT_SECRET,
//             { expiresIn: '7d' }
//         );
//         res.json({
//             message: 'Login successful',
//             token,
//             user: {
//                 id: user._id,
//                 name: user.name,
//                 email: user.email
//             }
//         });
//     } catch (error) {
//         res.status(500).json({ message: 'Server error' });
//     }
// };

// export const getProfile = async (req, res) => {
//     try {
//         const user = await User.findById(req.user._id).select('-password');
//         res.json(user);
//     } catch (error) {
//         res.status(500).json({ message: 'Server error' });
//     }
// };
