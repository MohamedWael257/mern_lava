import Booking from '../models/booking.model.js';
import User from '../models/user.model.js';
import Services from '../models/services.model.js'
import { sendMail } from "../services/nodemailer.js"
import { validationResult } from 'express-validator';
import keys from '../config/keys.js';
const { FAILD, FAILD_CODE, SUCCESS, SUCCESS_CODE } = keys.codes
export const booking = async (req, res) => {
    const { bookingamount, bookingdate, uid, bookingitem } = req.body;
    const Errors = validationResult(req);
    if (!Errors.isEmpty()) {
        return res.json({
            Status: FAILD,
            Status_Code: FAILD_CODE,
            message: "Can't Booking please Try again later",
            data: Errors.array().map((arr) => arr.msg),
        });
    }
    try {
        const booking = await Booking.create({
            bookingamount,
            bookingdate,
            uid,
            bookingitem,
        });
        await booking.save();
        let array_id = new Array();
        await bookingitem.map(booking => array_id.push(booking.id))
        for (const key in array_id) {
            const service = await Services.findOne({ _id: array_id[key] });
            const Servicebooks = service.rating.N_of_Book
            const servicenewbooks = Servicebooks + 1
            await Services.updateOne(
                { _id: array_id[key] },
                {
                    $set: { "rating.N_of_Book": servicenewbooks, }
                }
            );
        }
        const findUser = await User.findOne({ _id: uid })
        await sendMail(findUser.email, 'booking-confirmation', null, {
            _id: booking._id,
            user: findUser.username,
        })
        return res.json({
            Status: SUCCESS,
            Status_Code: SUCCESS_CODE,
            message: "Payment Successfully",
        });
    }
    catch (error) {
        return res.json({
            Status: FAILD,
            Status_Code: FAILD_CODE,
            message: "Error Payment",
        });
    }
}

export const bookingData = async (req, res) => {
    try {
        const booking = await Booking.find();
        return res.status(200).json(booking);
    } catch (error) {
        return res.status(500).json({ message: 'Failed to retrieve booking' });
    }
}
export const bookingData_ID = async (req, res) => {
    const Errors = validationResult(req);
    if (!Errors.isEmpty()) {
        return res.json({
            Status: FAILD,
            Status_Code: FAILD_CODE,
            message: "Can't Get your Booking history please Try again later",
            data: Errors.array().map((arr) => arr.msg),
        });
    }
    try {
        const { id } = req.params
        const booking = await Booking.find({ uid: id });
        return res.json(booking);
    } catch (error) {
        return res.status(500).json({ message: 'Failed to retrieve booking' });
    }
}