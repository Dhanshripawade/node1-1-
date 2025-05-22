import express from 'express'
import { getsuperAdmindata,postsuperAdmindata ,resetSuperAdmin} from '../controller/superAdmin.controller.js';

const router =express.Router();
router.post("/register" , getsuperAdmindata);
router.post("/login",postsuperAdmindata);
router.post ("/reset-password",resetSuperAdmin);

export default router