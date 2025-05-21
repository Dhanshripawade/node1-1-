import express from 'express'
import { admindata, adminlogin } from '../controller/admin.controller.js';
const router =express.Router();

router.post("/register",admindata)
router.post("/login",adminlogin);

export default router
