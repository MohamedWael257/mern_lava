import express from "express";
import { add_chat, chatsData, clear_chat } from "../controllers/chat.controller.js";

const router = express.Router();

router.post('/add-chat', add_chat);
router.post('/chatsData', chatsData);
router.post('/clear-chat', clear_chat);

export default router