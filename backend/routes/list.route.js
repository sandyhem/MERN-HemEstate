import express from 'express'
import { createListing, deleteListing, getListing, getListings, updateListing } from '../controllers/list.controller.js';
import { verifyUser } from '../utils/verifyUser.js';
const router=express.Router();

router.post('/create',verifyUser,createListing)
router.delete('/delete/:id',verifyUser,deleteListing)
router.post('/update/:id',verifyUser,updateListing)
router.get('/get/:id',getListing) //we need to show listing to all.
router.get('/get',getListings)

export default router;