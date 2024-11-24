import User from "../models/User.js";
import awsIot from "aws-iot-device-sdk";
import xss from 'xss';
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import passport from 'passport';
import path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables from .env file
dotenv.config();

// Resolve the current directory path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure AWS IoT device
const device = awsIot.device({
  keyPath: path.resolve(__dirname, './certs/Private Key.key'),
  certPath: path.resolve(__dirname, './certs/Device Certificate.crt'),
  caPath: path.resolve(__dirname, './certs/AmazonRootCA1.pem'),
  clientId: 'client21ccc',
  host: 'a3orne66rm5miq-ats.iot.us-east-1.amazonaws.com',
});

// Setup AWS IoT device event handlers
device
  .on('connect', () => {
    console.log('Connected to AWS IoT');
  })
  .on('close', () => {
    console.log('AWS IoT connection closed');
  })
  .on('reconnect', () => {
    console.log('AWS IoT connection reconnecting');
  })
  .on('offline', () => {
    console.log('AWS IoT connection offline');
  })
  .on('error', (error) => {
  console.error('AWS IoT connection error:', error.message || error);
});

/**
 * Publish a message to the 'esp32/sub/clock' topic
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 */
const clock = async (req, res) => {
  try {
    device.publish('esp32/sub/clock', JSON.stringify({ test_data: 'Clock' }));
    res.status(200).send({ message: 'Published to AWS IoT: Clock' });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: 'Failed to publish to AWS IoT' });
  }
};

/**
 * Publish a message to the 'esp32/sub/anticlock' topic
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 */
const anticlock = async (req, res) => {
  try {
    device.publish('esp32/sub/anticlock', JSON.stringify({ test_data: 'Anticlock' }));
    res.status(200).send({ message: 'Published to AWS IoT: Anticlock' });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: 'Failed to publish to AWS IoT' });
  }
};

/**
 * Publish a message to the 'esp32/sub/speedinc' topic
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 */
const speedInc = async (req, res) => {
  try {
    device.publish('esp32/sub/speedinc', JSON.stringify({ test_data: 'IncreaseSpeed' }));
    res.status(200).send({ message: 'Published to AWS IoT: IncreaseSpeed' });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: 'Failed to publish to AWS IoT' });
  }
};

/**
 * Publish a message to the 'esp32/sub/stop' topic
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 */
const stop = async (req, res) => {
  try {
    device.publish('esp32/sub/stop', JSON.stringify({ test_data: 'Stop' }));
    res.status(200).send({ message: 'Published to AWS IoT: Stop' });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: 'Failed to publish to AWS IoT' });
  }
};

export { clock, anticlock, speedInc, stop };
