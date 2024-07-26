import express from "express";
import { test, update } from "../controllers/user.controller.js";
import { verifyUser } from "../utils/verifyUser.js";

const router=express.Router();

router.get('/test',test);
router.post('/update/:id',verifyUser,update)

export default router;
