import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { sanitizeUser } from '../services/common.js';

// Configure the local authentication strategy
passport.use('local', new LocalStrategy(async (username, password, done) => {
    try {
        // Find user by username
        const user = await User.findOne({ username: username });
        if (!user) {
            return done(null, false, { message: 'Invalid credentials' });
        }

        // Compare provided password with stored hash
        bcrypt.compare(password, user.password, (err, result) => {
            if (err || !result) {
                return done(null, false, { message: 'Invalid credentials' });
            } else {
                // Generate JWT token
                const token = jwt.sign(sanitizeUser(user), process.env.JWT_SECRET);
                return done(null, token);
            }
        });
    } catch (err) {
        return done(err);
    }
}));

/**
 * Middleware to authenticate requests using local strategy
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @param {function} next - Express next middleware function
 */
const authenticateLocal = async (req, res, next) => {
    passport.authenticate('local', (err, token, info) => {
        if (err) {
            return next(err);
        }
        if (!token) {
            return res.status(401).json(info);
        }

        // Attach token to request object
        req.token = token;
        next();
    })(req, res, next);
};

export { authenticateLocal };
