import express from "express";
import { add_notification, notificationData, clear_notification } from "../controllers/notification.controller.js";
import { body, param } from "express-validator";
const router = express.Router();

router.post('/add-notification',
    [
        body("uid").notEmpty().withMessage("Uid is not Valid"),
        body("title").notEmpty().withMessage("Title is not Valid"),
        body("description").notEmpty().withMessage("Description is not Valid"),
        body("price").notEmpty().withMessage("Price is not Valid"),
        body("date").notEmpty().withMessage("Date is not Valid"),

    ],
    add_notification
);
router.get('/notificationData/:id',
    [
        param("id").notEmpty().withMessage("Id is not Valid"),

    ],
    notificationData
);
router.post('/clear-notification',
    [
        body("notificationId").notEmpty().withMessage("Id is not Valid"),

    ],
    clear_notification
);

export default router