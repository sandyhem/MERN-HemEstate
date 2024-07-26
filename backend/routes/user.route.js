import express from "express";
import { deleteuser, test, update } from "../controllers/user.controller.js";
import { verifyUser } from "../utils/verifyUser.js";

const router=express.Router();

router.get('/test',test);
router.post('/update/:id',verifyUser,update)
router.delete('/delete/:id',verifyUser,deleteuser)
export default router;
