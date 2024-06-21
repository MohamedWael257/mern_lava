import Products from "../models/products.model.js"
import Services from '../models/services.model.js';
import { validationResult } from "express-validator";
import keys from "../config/keys.js"
import Seen from "../models/seen.model.js";
import Rate from "../models/rate.model.js"
const { FAILD, FAILD_CODE, SUCCESS, SUCCESS_CODE } = keys.codes
const { apiURL } = keys.app
export const productsData = async (req, res) => {

    try {
        const products = await Products.find();
        return res.status(200).json(products);
    }
    catch (error) {
        return res.status(500).json({ message: 'Failed to retrieve products' });
    }
}
export const get_product = async (req, res) => {
    const product_ID = req.params.product_ID;
    const { uid } = req.body;
    const Errors = validationResult(req);
    // Body Validation Before Searching in the database to increase performance
    if (!Errors.isEmpty()) {
        return res.json({
            Status: FAILD,
            Status_Code: FAILD_CODE,
            message: "Can't Get your productsData please Try again later",
            data: Errors.array().map((arr) => arr.msg),
        });
    }
    try {
        const UserHaveSeenProduct = await Seen.findOne({
            product_ID: product_ID,
            uid: uid,
        });
        // in case of  user hasn't seen the product
        if (UserHaveSeenProduct == null) {
            const NewSeen = new Seen({ product_ID: product_ID, uid: uid });
            await NewSeen.save();
            const product = await Products.findOne({ _id: product_ID });
            const Productwatches = product.rating.N_of_Watches
            const Productnewwatch = Productwatches + 1
            await Products.updateOne(
                { _id: product_ID },
                { $set: { "rating.N_of_Watches": Productnewwatch } }
            );
            res.json({
                Status: SUCCESS,
                Status_Code: SUCCESS_CODE,
                message: "New Seen Product",
                // Data: {
                //     ...Product._doc,
                //     IsinCart: Values.includes(Product._id.toString()) ? true : false,
                //     User_Rate: Rate === null ? 0 : Rate.Rate,
                //     CountInCart: CountProduct.length > 0 ? CountProduct[0].Count : 0,
                // },
            });
        }
        else {
            const product = await Products.findOne({ _id: product_ID });
            const Productwatches = product.rating.N_of_Watches
            const Productnewwatch = Productwatches + 1
            await Products.updateOne(
                { _id: product_ID },
                { $set: { "rating.N_of_Watches": Productnewwatch } }
            );

            res.json({
                Status: SUCCESS,
                Status_Code: SUCCESS_CODE,
                message: "Seen Updated",

                // Data: {
                //     ...Product._doc,
                //     IsinCart: Values.includes(Product._id.toString()) ? true : false,
                //     User_Rate: Rate === null ? 0 : Rate.Rate,
                //     CountInCart: CountProduct.length > 0 ? CountProduct[0].Count : 0,
                // },
            });
        }

    }
    catch (err) {
        res.json({
            Status: FAILD,
            Status_Code: FAILD_CODE,
            message: "Page NOt Found",
        });
    }
};
export const add_product = async (req, res) => {
    const { name, description, price, brand, category } = req.body;
    const imageName = req.file.filename;
    const Errors = validationResult(req);
    // Body Validation Before Searching in the database to increase performance
    if (!Errors.isEmpty()) {
        return res.json({
            Status: FAILD,
            Status_Code: FAILD_CODE,
            message: "Can't Create new product please Try again later",
            data: Errors.array().map((arr) => arr.msg),
        });
    }
    try {
        const newProduct = await Products.create({
            name,
            description,
            category,
            price,
            ImageUrl: `${apiURL}/uploads/product/${imageName}`,
            brand,
        });
        await newProduct.save();
        return res.json({ message: 'Product created successfully' });
    }
    catch (error) {
        return res.json({ message: 'Failed to create product' });
    }
};
export const edit_product = async (req, res) => {
    const { id, name, description, brand, price, category, image } = req.body;
    const Errors = validationResult(req);
    // Body Validation Before Searching in the database to increase performance
    if (!Errors.isEmpty()) {
        return res.json({
            Status: FAILD,
            Status_Code: FAILD_CODE,
            message: "Can't Edit product please Try again later",
            data: Errors.array().map((arr) => arr.msg),
        });
    }
    try {
        // const { id } = req.params
        // const imageName = req.file.filename;
        const oldProduct = await Products.findOne({ _id: id });
        if (!oldProduct) {
            return res.json({ error: "Product is not Exists" });
        }
        if (image) {
            await Products.updateOne(
                { _id: id },
                {
                    $set: {
                        name,
                        description,
                        brand,
                        price,
                        ImageUrl: `${image}`,
                        category
                    }
                }
            );
            return res.json({
                Status: SUCCESS,
                Status_Code: SUCCESS_CODE,
                message: 'Product Edited successfully'
            });
        }
        else {
            await Products.updateOne(
                { _id: id },
                {
                    $set: {
                        name,
                        description,
                        brand,
                        price,
                        ImageUrl: `${apiURL}/uploads/product/${req.file.filename}`,
                        category
                    }
                }
            );
            return res.json({
                Status: SUCCESS,
                Status_Code: SUCCESS_CODE,
                message: 'Product Edited successfully'
            });
        }
    } catch (error) {
        return res.json({
            Status: FAILD,
            Status_Code: FAILD_CODE,
            message: 'Failed to Edite Products'
        });
    }
}
export const delete_product = async (req, res) => {
    const { id } = req.params
    const Errors = validationResult(req);
    // Body Validation Before Searching in the database to increase performance
    if (!Errors.isEmpty()) {
        return res.json({
            Status: FAILD,
            Status_Code: FAILD_CODE,
            message: "Can't Delete product please Try again later",
            data: Errors.array().map((arr) => arr.msg),
        });
    }
    try {
        await Products.deleteOne({ _id: id })
        // await newProduct.save();
        return res.status(201).json({ message: 'Product deleted successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'Failed to delete product' });
    }
};


export const servicesData = async (req, res) => {
    try {
        const products = await Services.find();
        return res.status(200).json(products);
    } catch (error) {
        return res.status(500).json({ message: 'Failed to retrieve products' });
    }
}
export const add_service = async (req, res) => {
    const { title, description, serviceprice, serviceduration } = req.body;
    const imageName = req.file.filename;
    const Errors = validationResult(req);
    // Body Validation Before Searching in the database to increase performance
    if (!Errors.isEmpty()) {
        return res.json({
            Status: FAILD,
            Status_Code: FAILD_CODE,
            message: "Can't Create new Service please Try again later",
            data: Errors.array().map((arr) => arr.msg),
        });
    }
    try {
        const newProduct = new Services({
            title,
            description,
            serviceprice,
            serviceduration,
            ImageUrl: `${apiURL}/uploads/service/${imageName}`,
        });
        await newProduct.save();
        return res.json({ message: 'Service created successfully' });
    } catch (error) {
        return res.json({ message: 'Failed to create Service' });
    }
};
export const edit_service = async (req, res) => {
    const Errors = validationResult(req);
    // Body Validation Before Searching in the database to increase performance
    if (!Errors.isEmpty()) {
        return res.json({
            Status: FAILD,
            Status_Code: FAILD_CODE,
            message: "Can't Edit Service please Try again later",
            data: Errors.array().map((arr) => arr.msg),
        });
    }
    try {
        const { id, title, description, serviceprice, serviceduration, image } = req.body;
        const oldService = await Services.findOne({ _id: id });
        if (!oldService) {
            return res.json({ error: "Service is not Exists" });
        }
        if (image) {
            await Services.updateOne(
                { _id: id },
                {
                    $set: {
                        title,
                        description,
                        serviceprice,
                        serviceduration,
                        ImageUrl: `${image}`,
                    }
                }
            );
            return res.json({
                Status: SUCCESS,
                Status_Code: SUCCESS_CODE,
                message: 'Service Edited successfully'
            });
        }
        else {
            await Services.updateOne(
                { _id: id },
                {
                    $set: {
                        title,
                        description,
                        serviceprice,
                        serviceduration,
                        ImageUrl: `${apiURL}/uploads/service/${req.file.filename}`,

                    }
                }
            );
            return res.json({
                Status: SUCCESS,
                Status_Code: SUCCESS_CODE,
                message: 'Service Edited successfully'
            });
        }
    } catch (error) {
        return res.json({
            Status: FAILD,
            Status_Code: FAILD_CODE,
            message: 'Failed to Edite car'
        });
    }
}
export const delete_service = async (req, res) => {
    const { id } = req.params
    const Errors = validationResult(req);
    // Body Validation Before Searching in the database to increase performance
    if (!Errors.isEmpty()) {
        return res.json({
            Status: FAILD,
            Status_Code: FAILD_CODE,
            message: "Can't Delete Service please Try again later",
            data: Errors.array().map((arr) => arr.msg),
        });
    }
    try {
        await Services.deleteOne({ _id: id })
        // await newProduct.save();
        return res.status(201).json({ message: 'Product deleted successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'Failed to delete product' });
    }
};

