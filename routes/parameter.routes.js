import { Router } from 'express'
import { createParamter, fetchAllParamater, fetchParameterById, updateParameter } from '../controllers/parameter.controller.js'
import { body } from "express-validator";
import passport from "passport";

const router = Router()

router.route('/',).get(
    // passport.authenticate('jwt'),
    fetchAllParamater
)
router.route('/',).post(
    // passport.authenticate('jwt'),
    createParamter
)
router.route('/:id',).get(
    passport.authenticate('jwt'),
    fetchParameterById
)
router.route('/:id',).patch(
    passport.authenticate('jwt'),
    updateParameter
)

export default router
