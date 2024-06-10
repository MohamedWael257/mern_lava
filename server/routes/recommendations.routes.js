import express from "express";
import { recommend } from "../controllers/recommendations.conroller.js";
const router = express.Router();
router.get("/recommend", recommend);

export default router