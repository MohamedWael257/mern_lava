import express from "express";
import { productsData, servicesData, add_service, delete_service, edit_service, get_product, add_product, edit_product, delete_product } from "../controllers/product.controller.js";
import upload_product from "../multer/product.multer.js";
import upload_service from "../multer/service.multer.js";
import { body, param, } from "express-validator";
const router = express.Router();

router.get("/productsData", productsData);
router.post("/get-product/:product_ID",
    [
        body("uid").notEmpty().withMessage("uid is not Valid"),
        param("product_ID").notEmpty().withMessage("product_ID is not Valid")
    ],
    get_product
);
router.post("/add-product",
    upload_product.single('image'),
    [
        body("name").notEmpty().withMessage("name is not Valid"),
        body("description").notEmpty().withMessage("description is not Valid"),
        body("brand").notEmpty().withMessage("brand is not Valid"),
        body("price").notEmpty().withMessage("price is not Valid"),
        body("category").notEmpty().withMessage("category is not Valid"),
    ],
    add_product
);
router.post("/edit-product",
    upload_product.single('image'),
    [
        body("id").notEmpty().withMessage("id is not Valid"),
        body("name").notEmpty().withMessage("name is not Valid"),
        body("description").notEmpty().withMessage("description is not Valid"),
        body("brand").notEmpty().withMessage("brand is not Valid"),
        body("price").notEmpty().withMessage("price is not Valid"),
        body("category").notEmpty().withMessage("category is not Valid"),
    ],
    edit_product
);
router.get("/delete-product/:id",
    [
        param("id").notEmpty().withMessage("id is not Valid")

    ],
    delete_product
);


router.get("/servicesData", servicesData);
router.post("/add-service",
    upload_service.single('image'),
    [
        body("title").notEmpty().withMessage("title is not Valid"),
        body("description").notEmpty().withMessage("description is not Valid"),
        body("serviceprice").notEmpty().withMessage("serviceprice is not Valid"),
        body("serviceduration").notEmpty().withMessage("serviceduration is not Valid"),
        body("category").notEmpty().withMessage("category is not Valid"),
    ],
    add_service
);
router.post("/edit-service",
    upload_service.single('image'),
    [
        body("id").notEmpty().withMessage("id is not Valid"),
        body("title").notEmpty().withMessage("title is not Valid"),
        body("description").notEmpty().withMessage("description is not Valid"),
        body("serviceprice").notEmpty().withMessage("serviceprice is not Valid"),
        body("serviceduration").notEmpty().withMessage("serviceduration is not Valid"),
    ],
    edit_service
);
router.get("/delete-service/:id",
    [
        param("id").notEmpty().withMessage("id is not Valid")
    ],
    delete_service
);


export default router