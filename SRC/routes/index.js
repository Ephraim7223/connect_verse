import express from "express";
import authRoute from './auth/auth.routes.js';
const router = express.Router();

router.use('/auth', authRoute)

export default router