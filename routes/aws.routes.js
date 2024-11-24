import { Router } from 'express'
import { clock, anticlock, speedInc, stop } from '../controllers/aws.controller.js'
import { body } from "express-validator";
import passport from "passport";

const router = Router()

router.route('/clock',).post(
    // passport.authenticate('jwt'),
    clock
)
router.route('/anticlock',).post(
    // passport.authenticate('jwt'),
    anticlock
)
router.route('/speedInc',).post(
    // passport.authenticate('jwt'),
    speedInc
)
router.route('/stop',).post(
    // passport.authenticate('jwt'),
    stop
)

export default router
