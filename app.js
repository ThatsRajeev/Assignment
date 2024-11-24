import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import session from 'express-session';
import passport from 'passport';
import cookieParser from "cookie-parser";
import dotenv from 'dotenv';

// Import passport strategies and routes
import { authenticateLocal } from "./middleware/authenticateLocal.js";
import { authenticateJwt } from "./middleware/authenticateJwt.js";
import authRouter from './routes/auth.routes.js';
import robotsRouter from './routes/robots.routes.js';
import awsRouter from './routes/aws.routes.js';
import parameterRouter from './routes/parameter.routes.js';

// Load environment variables from .env file
dotenv.config();

const app = express();

// Middleware configuration
app.use(cors({
  origin: ["http://localhost:5173","http://localhost:5174","http://localhost:5175"],
  methods: ["POST", "GET", "PATCH", "DELETE"],
  credentials: true,
}));
app.use(session({
  secret: process.env.JWT_SECRET,
  resave: false,
  saveUninitialized: false
}));
app.use(passport.authenticate('session'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Route configuration
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/robots", robotsRouter);
app.use("/api/v1/aws", awsRouter);
app.use("/api/v1/parameter", parameterRouter);

// Passport Strategies
passport.use(authenticateLocal);
passport.use(authenticateJwt);

// Serialize user into session
passport.serializeUser((user, cb) => {
  process.nextTick(() => {
    return cb(null, { id: user.id });
  });
});

// Deserialize user from session
passport.deserializeUser((user, cb) => {
  process.nextTick(() => {
    return cb(null, user);
  });
});

// Default route
app.get('/', (req, res) => {
  res.json('Hello World');
});

// MongoDB connection
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
  }
};

const PORT = process.env.PORT || 4433;

// Start the server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
});
