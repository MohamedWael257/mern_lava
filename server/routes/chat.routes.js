import express from "express";
import { add_chat, chatsData, clear_chat } from "../controllers/chat.controller.js";
const router = express.Router();
import upload_chat from "../multer/chat.multer.js"

router.post('/add-chat',
    upload_chat.single("image"),

    add_chat);
router.post('/chatsData', chatsData);
router.post('/clear-chat', clear_chat);

export default router