import express from 'express'
import { userregister ,userlogin,userlogout} from '../controller/user.controller.js';

const router=express.Router();
router.get("/register",userregister);
router.get("/login",userlogin);
router.get("/logout",userlogout)
export default router