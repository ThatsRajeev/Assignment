import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import User from '../models/User.js';
import { sanitizeUser } from '../services/common.js';

// Configuration options for JWT strategy
const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET || 'SECRET'
};

// Define the JWT authentication strategy
passport.use('jwt', new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
        // Find user by ID from the JWT payload
        const user = await User.findOne({ id: jwt_payload.sub });
        if (user) {
            // User found, return sanitized user data
            return done(null, sanitizeUser(user));
        } else {
            // User not found
            return done(null, false);
        }
    } catch (err) {
        // Handle errors
        return done(err, false);
    }
}));

/**
 * Middleware to authenticate requests using JWT
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @param {function} next - Express next middleware function
 */
const authenticateJwt = async (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
        if (err) {
            // Pass error to next middleware
            return next(err);
        }
        if (!user) {
            // Unauthorized access
            return res.status(401).json(info);
        }

        // Attach user to request object
        req.user = user;
        next();
    })(req, res, next);
};

export { authenticateJwt };
