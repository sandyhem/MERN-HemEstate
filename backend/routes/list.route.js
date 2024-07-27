import express from 'express'
import { createListing } from '../controllers/list.controller.js';
import { verifyUser } from '../utils/verifyUser.js';
const router=express.Router();

router.post('/create',verifyUser,createListing)

export default router;