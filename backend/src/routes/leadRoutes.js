import express from "express";
import { createLead } from "../controllers/leadController.js";

const router = express.Router();

router.post("/submit", createLead);

export default router;
