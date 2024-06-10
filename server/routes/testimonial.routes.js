import express from "express";
import { send_testimonial, testimonialData, clear_testimonial } from "../controllers/testimonial.controller.js";
import { body } from "express-validator";

const router = express.Router();

router.post('/send-testimonial',
    [
        body("uid").notEmpty().withMessage("_id is not Valid"),
        body("email")
            .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/gi)
            .withMessage("email is not Valid"),
        body("phone").notEmpty().withMessage("Phone is not Valid"),
        body("message").notEmpty().withMessage("message is not Valid"),
        body("firstname").notEmpty().withMessage("Firstname is not Valid"),
        body("lastname").notEmpty().withMessage("Lastname is not Valid"),
        body("date").notEmpty().withMessage("Date is not Valid"),
        body("photoimage").notEmpty().withMessage("Photoimage is not Valid"),
    ],
    send_testimonial
);
router.post('/testimonialData', testimonialData);
router.post('/clear-testimonial',
    [
        body("selectedid").notEmpty().withMessage("Selected_id is not Valid"),
    ],
    clear_testimonial
);

export default router