import express from 'express'
import { userregister ,userlogin,userlogout} from '../controller/user.controller.js';

const router=express.Router();
router.post("/register",userregister);
router.post("/login",userlogin);
router.get("/logout",userlogout)
export default router