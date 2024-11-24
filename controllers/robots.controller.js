import Robot from "../models/Robot.js";
import awsIot from "aws-iot-device-sdk";
import xss from 'xss';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config()

// Secret key for JWT
const secret = process.env.JWT_SECRET

/**
 * Save new Robot details
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 */
const createRobot = async (req, res) => {
  const robot = new Robot(req.body);
  try {
    const doc = await robot.save();
    res.status(201).json(doc);
  } catch (err) {
    res.status(400).json(err);
  }
};

/**
 * Fetch all robots details
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 */
const fetchAllRobots = async (req, res) => {
  try {
    const docs = await Robot.find({});
    res.status(201).json(docs);
  } catch(err) {
    console.error(err);
    return res.status(400).send(err);
  }
}

/**
 * Fetch Robot details by id
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 */
const fetchRobotById = async (req, res) => {
  const { id } = req.params;

  try {
    const robot = await Robot.findById(id);
    res.status(200).json(robot);
  } catch (err) {
    res.status(400).json(err);
  }
};

/**
 * Update Robot details by id
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 */
const updateRobot = async (req, res) => {
  const { id } = req.params;

  try {
    const robot = await Robot.findByIdAndUpdate(id, req.body, {new:true});
    res.status(200).json(robot);
  } catch (err) {
    res.status(400).json(err);
  }
};

export { createRobot, fetchAllRobots, fetchRobotById, updateRobot }
