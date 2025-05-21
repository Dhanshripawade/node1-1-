import express from 'express'
import { getsuperAdmindata,postsuperAdmindata,updatesuperAdmindata } from '../controller/superAdmin.controller.js';

const router =express.Router();
router.post("/register" , getsuperAdmindata);
router.post("/login",postsuperAdmindata);
router.get("/updatedata",updatesuperAdmindata)
export default router