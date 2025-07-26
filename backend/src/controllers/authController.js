// backend/src/controllers/authController.js
import User from '../models/User.js'; // Note the .js extension
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import Log from '../models/Log.js'; // Import Log model, note the .js extension

// Helper to generate JWT token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '1h', // Token expires in 1 hour
    });
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
export const registerUser = async (req, res) => {
    const { username, email, password, role } = req.body; // Role can be set for initial users, or default to 'viewer'

    try {
        const userExists = await User.findOne({ $or: [{ email }, { username }] });
        if (userExists) {
            return res.status(400).json({ message: 'User with that email or username already exists' });
        }

        const user = await User.create({
            username,
            email,
            password,
            role: role || 'viewer' // Default role
        });

        if (user) {
            await Log.create({ userId: user._id, username: user.username, action: 'User Registered', details: `New user ${user.username} registered with role ${user.role}.` });
            res.status(201).json({
                _id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
                token: generateToken(user._id),
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error during registration' });
    }
};

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (user && (await user.matchPassword(password))) {
            await Log.create({ userId: user._id, username: user.username, action: 'User Logged In', details: `${user.username} logged in.` });
            res.json({
                _id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
                token: generateToken(user._id),
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error during login' });
    }
};

// @desc    Get current user profile
// @route   GET /api/auth/profile
// @access  Private
export const getProfile = async (req, res) => {
    // req.user is set by the auth middleware
    res.json(req.user);
};