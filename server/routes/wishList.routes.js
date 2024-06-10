// import files
import express from "express";
import { body } from "express-validator";
import { add_to_wishlist, delete_all_from_wishlist, delete_from_wishlist, get_all_wishlist } from "../controllers/wishlist.controller.js";


const Router = express.Router();

// Routes Handelar /API/WishList
Router.post("/wishlistData",
    //   Verify_Token,
    [body("uid").notEmpty().withMessage("User Id is not Valid")],
    get_all_wishlist
);
// Routes Handelar /API/WishList/Add
Router.post("/add-wishlist",
    //   Verify_Token,
    [
        body("uid").notEmpty().withMessage("User Id is not Valid"),
        body("product_ID").notEmpty().withMessage("Product_ID is not Valid"),
    ],
    add_to_wishlist
);
// Routes Handelar /API/WishList/Delete
Router.post("/delete-wishlist",
    //   Verify_Token,
    [
        body("uid").notEmpty().withMessage("User Id is not Valid"),
        body("product_ID").notEmpty().withMessage("Product_ID is not Valid"),
    ],
    delete_from_wishlist
)

// Routes Handelar /API/WishList/Delete/All
Router.post("/delete-all-wishlist",
    //   Verify_Token,
    [body("uid").notEmpty().withMessage("User Id is not Valid")],
    delete_all_from_wishlist
);

export default Router;