import express from 'express'
import { getclientdata,postclientdata,updateclientdata } from '../controller/client.controller.js';

const router =express.Router();
router.get("/getdata" , getclientdata);
router.get("/postdata",postclientdata);
router.get("/updatedata",updateclientdata)
export default router