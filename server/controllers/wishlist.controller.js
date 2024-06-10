// import files
import Wishlist from "../models/wishlist.model.js";
import Products from "../models/products.model.js";
import { validationResult } from "express-validator";
import keys from "../config/keys.js"
const { FAILD, FAILD_CODE, SUCCESS, SUCCESS_CODE } = keys.codes
import mongoose from "mongoose";

// Get all Wish List
export const get_all_wishlist = async (req, res) => {
    const { uid } = req.body;

    // Body Validation Before Searching in the database to increase performance
    const Errors = validationResult(req);
    if (!Errors.isEmpty()) {
        return res.json({
            Status: FAILD,
            Status_Code: FAILD_CODE,
            message: "Can't get All Wish List please Try again later",
            Data: Errors.array().map((arr) => arr.msg),
        });
    }

    try {
        // GEt all products in cart  From the Data Base
        const wishlistData = await Wishlist.aggregate([
            {
                $match: {
                    uid: new mongoose.Types.ObjectId(uid),
                },
            },
            {
                $lookup: {
                    from: "products",
                    localField: "product_ID",
                    foreignField: "_id",
                    as: "Product",
                },
            },
            { $unwind: "$Product" },
            {
                $replaceRoot: {
                    newRoot: {
                        $mergeObjects: ["$Product", { Count: "$Count" }],
                    },
                },
            },
        ]);

        return res.json({
            Status: SUCCESS,
            Status_Code: SUCCESS_CODE,
            Data: wishlistData,
        });
    } catch (err) {
        return res.json({
            Status: FAILD,
            Status_Code: FAILD_CODE,
            message: err.message,
        });
    }
};

// Add Single products To Wish List
export const add_to_wishlist = async (req, res) => {
    const { uid, product_ID } = req.body;
    // Body Validation Before Searching in the database to increase performance
    const Errors = validationResult(req);
    if (!Errors.isEmpty()) {
        return res.json({
            Status: FAILD,
            Status_Code: FAILD_CODE,
            message: "Can't Add to cart please Try again later",
            Data: Errors.array().map((arr) => arr.msg),
        });
    }

    try {
        // GEt Single products From the Data Base
        const Product = await Wishlist.findOne({ uid, product_ID });

        if (Product === null) {
            const AddItem = new Wishlist({ uid, product_ID });
            await AddItem.save();
            const product = await Products.findOne({ _id: product_ID });
            const Productlikes = product.rating.N_of_Likes
            const Productnewlike = Productlikes + 1
            await Products.updateOne(
                { _id: product_ID },
                {
                    $set: {
                        favourit: true,
                        "rating.N_of_Likes": Productnewlike,
                    }
                }
            );
            return res.json({
                Status: SUCCESS,
                Status_Code: SUCCESS_CODE,
                message: "product added !",
            });
        }
        else {
            return res.json({
                Status: FAILD,
                Status_Code: FAILD_CODE,
                message: "You want add item not Founded to Wish List !",
            });
        }

    } catch (err) {
        return res.json({
            Status: FAILD,
            Status_Code: FAILD_CODE,
            message: "product can't be added !",
        });
    }
};

// Delete Single products From wish list
export const delete_from_wishlist = async (req, res) => {
    const { uid, product_ID } = req.body;
    // Body Validation Before Searching in the database to increase performance
    const Errors = validationResult(req);
    if (!Errors.isEmpty()) {
        return res.json({
            Status: FAILD,
            Status_Code: FAILD_CODE,
            message: "Can't Delete please Try again later",
            Data: Errors.array().map((arr) => arr.msg),
        });
    }

    try {
        // GEt Single products From the Data Base
        const Product = await Wishlist.findOne({ uid, product_ID });
        if (Product !== null) {
            await Wishlist.deleteOne({ uid, product_ID });
            const product = await Products.findOne({ _id: product_ID });
            const Productlikes = product.rating.N_of_Likes
            const Productnewlike = Productlikes - 1
            await Products.updateOne(
                { _id: product_ID },
                {
                    $set: {
                        favourit: false,
                        "rating.N_of_Likes": Productnewlike,

                    }
                }
            );
            return res.json({
                Status: SUCCESS,
                Status_Code: SUCCESS_CODE,
                message: "product Deleted !",
            });

        } else {
            return res.json({
                Status: FAILD,
                Status_Code: FAILD_CODE,
                message: "You want delete item not Founded in Wish List !",
            });
        }
    } catch (err) {
        return res.json({
            Status: FAILD,
            Status_Code: FAILD_CODE,
            message: "product can't be Deleted !",
        });
    }
};

// Delete All products From wish list
export const delete_all_from_wishlist = async (req, res) => {
    const { uid } = req.body;
    // Body Validation Before Searching in the database to increase performance
    const Errors = validationResult(req);
    if (!Errors.isEmpty()) {
        return res.json({
            Status: FAILD,
            Status_Code: FAILD_CODE,
            message: "Can't Delete please Try again later",
            Data: Errors.array().map((arr) => arr.msg),
        });
    }

    try {
        await Wishlist.deleteMany({ uid });
        return res.json({
            Status: SUCCESS,
            Status_Code: SUCCESS_CODE,
            message: "products Deleted !",
        });
    } catch (err) {
        return res.json({
            Status: FAILD,
            Status_Code: FAILD_CODE,
            message: "product can't be Deleted !",
        });
    }
};


