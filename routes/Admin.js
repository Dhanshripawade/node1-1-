import express from 'express'
import { admindata, adminlogin , resetAdmin } from '../controller/admin.controller.js';
const router =express.Router();

router.post("/register",admindata);
router.post("/login",adminlogin);
router.post("/reset-password" , resetAdmin);

export default router
