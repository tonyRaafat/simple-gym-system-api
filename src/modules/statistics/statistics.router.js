import express from "express";
import { getMembersRevenue, getTrainerRevenue } from "./statistics.controller.js";

const router = express.Router()

router.get('/all-members',getMembersRevenue)
router.get('/tranier/:id',getTrainerRevenue)

export default router