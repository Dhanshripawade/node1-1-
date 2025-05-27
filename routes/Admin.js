import express from 'express'
import { admindata, adminlogin , resetAdmin } from '../controller/admin.controller.js';
import { createCollegeTask   , getallCollegeTask,Asigntasks} from '../controller/task.controller.js';
const router =express.Router();

router.post("/register",admindata);
router.post("/login",adminlogin);
router.post("/reset-password" , resetAdmin);

//task management
router.post ("/create-collegeTask", createCollegeTask)
router.post("/asign-task",Asigntasks)
router.get('/allCollegeTask', getallCollegeTask)

export default router
