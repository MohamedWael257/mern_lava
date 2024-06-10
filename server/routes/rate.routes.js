// import files
import express from "express";
import { update_rate } from "../controllers/rate.controller.js";
import { body } from "express-validator";

const router = express.Router();

router.post("/update-rate",
    // Verify_Token,
    [
        body("uid").notEmpty().withMessage("User Id is not Valid"),
        body("product_ID").notEmpty().withMessage("Product_ID is not Valid"),
        body("rate").notEmpty().withMessage("Rate is not Valid"),
    ],
    update_rate
);

export default router;
