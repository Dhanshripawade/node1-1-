import express from 'express'
import { userregister ,userlogin , resetUser} from '../controller/user.controller.js';

const router=express.Router();
router.post("/register",userregister);
router.post("/login",userlogin);
router.post ("/reset-password",resetUser);

export default router