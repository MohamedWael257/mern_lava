import express from "express";
import { checkout, get_all_orders, ordersData } from "../controllers/store.controller.js";
import { body, param } from "express-validator";
const router = express.Router();

router.post('/checkout',
    [
        body("orderamount").notEmpty().withMessage("Order Amount is Required"),
        body("orderdate").notEmpty().withMessage("Order Date is Required"),
        body("orderitem").notEmpty().withMessage("Order Item is Required"),
        body("uid").notEmpty().withMessage("Uid is Required"),
    ],
    checkout
);
router.get('/ordersData', ordersData);
router.post('/get-all-orders/:id',
    [
        param('id').notEmpty().withMessage("Id is not valid")
    ],
    get_all_orders
);
export default router