import { Router } from 'express'
import { createRobot, fetchAllRobots, fetchRobotById, updateRobot } from '../controllers/robots.controller.js'
import { body } from "express-validator";
import passport from "passport";

const router = Router()

router.route('/',).get(
    // passport.authenticate('jwt'),
    fetchAllRobots
)
router.route('/',).post(
    // passport.authenticate('jwt'),
    createRobot
)
router.route('/:id',).get(
    passport.authenticate('jwt'),
    fetchRobotById
)
router.route('/:id',).patch(
    passport.authenticate('jwt'),
    updateRobot
)

export default router
