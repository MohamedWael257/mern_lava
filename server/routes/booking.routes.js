import express from "express";
import { booking, bookingData, bookingData_ID } from "../controllers/booking.controller.js";
import { body, param } from "express-validator";
const router = express.Router();

router.post('/booking',
    [
        body("bookingamount").notEmpty().withMessage("Booking Amount is Required"),
        body("bookingdate").notEmpty().withMessage("Booking Date is Required"),
        body("uid").notEmpty().withMessage("Uid is Required"),
        body("bookingitem").notEmpty().withMessage("Booking Item is Required"),
    ],
    booking
);
router.get('/bookingData', bookingData);
router.get('/bookingData/:id',
    [
        param('id').notEmpty().withMessage("Id is not valid")
    ],
    bookingData_ID
);

export default router