import { Router } from 'express';
import { login, createUser, updateUser, checkUser } from '../controllers/auth.controller.js';
import { body } from "express-validator";
import passport from "passport";
import { authorizeRoles } from '../middleware/rbac.js'; 

const router = Router();

router.route('/login').post(
    body('username', 'Username cannot be blank').exists(),
    body('password', 'Password cannot be blank').exists(),
    passport.authenticate('local', { session: false }), 
    login
);

router.route('/createUser').post(
    body('username', 'Username must be at least 3 characters long.').isLength({ min: 3 }),
    body('org', 'Org must be at least 3 characters long.').isLength({ min: 3 }),
    body('email', 'Enter a valid Email').isEmail(),
    body('password', 'Password must be at least 8 characters long.').isLength({ min: 8 }),
    passport.authenticate('jwt', { session: false }),
    authorizeRoles(['Admin']), 
    createUser
);

router.route('/updateUser').post(
    passport.authenticate('jwt', { session: false }),
    authorizeRoles(['Admin', 'Moderator']), 
    updateUser
);

router.route('/checkUser').get(
    passport.authenticate('jwt', { session: false }),
    checkUser
);

export default router;
