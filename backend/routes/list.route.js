import express from 'express'
import { createListing, deleteListing, getListing, updateListing } from '../controllers/list.controller.js';
import { verifyUser } from '../utils/verifyUser.js';
const router=express.Router();

router.post('/create',verifyUser,createListing)
router.delete('/delete/:id',verifyUser,deleteListing)
router.post('/update/:id',verifyUser,updateListing)
router.get('/get/:id',getListing) //we need to show listing to all.

export default router;