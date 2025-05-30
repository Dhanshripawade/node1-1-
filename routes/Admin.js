import express from 'express'
import { admindata, adminlogin , resetAdmin } from '../controller/admin.controller.js';
import { createCollegeTask   , getallCollegeTask,Asigntasks} from '../controller/task.controller.js';
import { createMembers , getallMembers , deleteMembers , updateMembers , viewMember} from '../controller/member.controller.js';
const router =express.Router();

router.post("/register",admindata);
router.post("/login",adminlogin);
router.post("/reset-password" , resetAdmin);

//task management
router.post ("/create-collegeTask", createCollegeTask);
router.post("/asign-task",Asigntasks);
router.get('/allCollegeTask', getallCollegeTask);

//members rout
router.post ("/create-members" , createMembers);
router.get("/allmembers" , getallMembers);
router.delete("/deletemembers" , deleteMembers);
router.patch("/updatemembers" , updateMembers);
router.get("/viewmembers" , viewMember)

export default router
