// import schema from Rate modle
import Rate from "../models/rate.model.js";
import Products from "../models/products.model.js";
import { validationResult } from "express-validator";
import keys from "../config/keys.js"
const { FAILD, FAILD_CODE, SUCCESS, SUCCESS_CODE } = keys.codes
// Update Single product Rate
export const update_rate = async (req, res) => {
    const { uid, product_ID, rate } = req.body;
    const Errors = validationResult(req);
    // // Body Validation Before Searching in the database to increase performance
    if (!Errors.isEmpty()) {
        return res.json({
            Status: FAILD,
            Status_Code: FAILD_CODE,
            message: "Can't Add Rate please Try again later",
            data: Errors.array().map((arr) => arr.msg),
        });
    }

    try {
        const FindProduct = await Rate.findOne({ uid, product_ID });
        if (FindProduct === null) {
            const New_Rate = new Rate({ uid, product_ID, rate });
            await New_Rate.save();
            const Product = await Products.findOne({ _id: product_ID });
            const ProductRate = Product.rating.rate;
            const ProductRateCount = Product.rating.rate_Count;
            const NewRatingCount = ProductRateCount + 1;
            const NewRate = (ProductRate * ProductRateCount + rate) / NewRatingCount;

            await Products.updateOne(
                { _id: product_ID },
                {
                    $set: {
                        "rating.rate": Math.round(NewRate),
                        "rating.rate_Count": NewRatingCount,
                    },
                }
            );

            return res.json({
                Status: SUCCESS,
                Status_Code: SUCCESS_CODE,
                message: "New Rate Added",
            });
        } else {
            const Product = await Products.findOne({ _id: product_ID });
            const RateUser = await Rate.findOne({ product_ID, uid });
            const ProductRate = Product.rating.rate;
            const ProductRateCount = Product.rating.rate_Count;
            const OldRate = RateUser.rate;
            const NewRate =
                (ProductRate * ProductRateCount + (rate - OldRate)) / ProductRateCount;
            await Products.updateOne(
                { _id: product_ID },
                {
                    $set: {
                        "rating.rate": Math.round(NewRate),
                    },
                }
            );
            await Rate.updateOne(
                { uid, product_ID },
                {
                    $set: {
                        rate: rate,
                    },
                }
            );
            return res.json({
                Status: SUCCESS,
                Status_Code: SUCCESS_CODE,
                message: "Rate Updated",
            });
        }
    } catch (err) {
        return res.json({
            Status: FAILD,
            Status_Code: FAILD_CODE,
            message: err.message,
        });
    }
};

