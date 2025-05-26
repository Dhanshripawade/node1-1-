import express from "express";
import { createTask } from "../controller/task.controller.js";
import validateCollege from "../middlesware/auth.js";

const router = express.Router();

router.post("/create", validateCollege, createTask);


// router.get("/", getTasks);
// router.delete("/:id", deleteTask);

export default router;
