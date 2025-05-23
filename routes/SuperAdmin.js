import express from 'express'
import { getsuperAdmindata,postsuperAdmindata ,resetSuperAdmin,getallSuperAdmin} from '../controller/superAdmin.controller.js';

const router =express.Router();
router.post("/register" , getsuperAdmindata);
router.post("/login",postsuperAdmindata);
router.post ("/reset-password",resetSuperAdmin);
router.get("/decoded" , getallSuperAdmin);

export default router