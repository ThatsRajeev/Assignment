import User from "../models/User.js";
import { validationResult } from 'express-validator';
import xss from 'xss';
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import passport from 'passport';
import { hashPassword, sanitizeUser } from '../services/common.js';

// Load environment variables from .env file
dotenv.config();

// Secret key for JWT
const secret = process.env.JWT_SECRET;

/**
 * Login user and generate JWT token
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 */
const login = async (req, res) => {
    // Validate request input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array()[0].msg });
    }

    // Authenticate user using passport
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return res.status(500).json({ message: 'Internal server error' });
        }
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        
        // Generate JWT token
        const token = jwt.sign({ id: user._id }, secret, { expiresIn: '1h' });
        res.cookie("token", token, { httpOnly: true });
        res.json(sanitizeUser(user));
    })(req, res);
};

/**
 * Create a new user
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 */
const createUser = async (req, res) => {
    // Validate request input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array()[0].msg });
    }

    try {
        // Check if username or email already exists
        const existingUsername = await User.findOne({ username: req.body.username });
        if (existingUsername) {
            return res.status(400).json({ error: 'Username already exists' });
        }

        const existingEmail = await User.findOne({ email: req.body.email });
        if (existingEmail) {
            return res.status(400).json({ error: 'Email already exists' });
        }

        // Hash the password
        const password = await hashPassword(req.body.password);

        // Create and save the new user
        const user = new User({
            username: req.body.username,
            org: req.body.org,
            email: req.body.email,
            password: password
        });
        const doc = await user.save();

        // Send sanitized user information in response
        res.status(201).json(sanitizeUser(doc));
    } catch (error) {
        res.status(500).json({ message: "Internal error occurred", error });
    }
};

/**
 * Update user information
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 */
const updateUser = async (req, res) => {
    // This function is a placeholder for user update logic
    // Add implementation for updating user information
    res.status(501).json({ message: "Update user functionality not implemented" });
};

/**
 * Check user authentication status
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 */
const checkUser = async (req, res) => {
    res.json(sanitizeUser(req.user));
};

export { login, createUser, updateUser, checkUser };
