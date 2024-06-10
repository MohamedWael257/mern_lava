import { validationResult } from 'express-validator';
import Orders from '../models/orders.model.js';
import Products from '../models/products.model.js';
import User from '../models/user.model.js';
import { sendMail } from "../services/nodemailer.js"
export const checkout = async (req, res) => {
    const { orderamount, orderdate, uid, orderitem } = req.body;
    const Errors = validationResult(req);
    if (!Errors.isEmpty()) {
        return res.json({
            Status: FAILD,
            Status_Code: FAILD_CODE,
            message: "Can't Checkout please Try again later",
            data: Errors.array().map((arr) => arr.msg),
        });
    }
    try {
        const orders = await Orders.create({ orderamount, orderdate, uid, orderitem });
        await orders.save();
        let array_id = new Array();
        await orderitem.map(order => array_id.push(order.id))
        for (const key in array_id) {
            const product = await Products.findOne({ _id: array_id[key] });
            const Productbuyes = product.rating.N_of_Buy
            const Productnewbuyes = Productbuyes + 1
            await Products.updateOne(
                { _id: array_id[key] },
                {
                    $set: { "rating.N_of_Buy": Productnewbuyes, }
                }
            );
        }
        const findUser = await User.find({ uid })
        await sendMail(findUser.email, 'order-confirmation', null, {
            _id: orders._id,
            user: findUser.username,
        })
        return res.send({ status: "Payment successful" });
    }
    catch (error) {
        return res.send({ status: "Error Payment" });
    }
}
export const ordersData = async (req, res) => {
    try {
        const orders = await Orders.find();
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve Orders' });
    }
}
export const get_all_orders = async (req, res) => {
    const { id } = req.params
    const Errors = validationResult(req);
    if (!Errors.isEmpty()) {
        return res.json({
            Status: FAILD,
            Status_Code: FAILD_CODE,
            message: "Can't Get your Orders history please Try again later",
            data: Errors.array().map((arr) => arr.msg),
        });
    }
    try {
        const orders = await Orders.find({ uid: id });
        // const orders = await Orders.aggregate([
        //     {
        //         $match: {
        //             uid: id,
        //         },
        //     },
        // ]);

        res.status(200).json(orders);

    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve Orders' });
    }
}
