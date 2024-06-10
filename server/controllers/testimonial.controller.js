import User from "../models/user.model.js";
import Testimonial from '../models/testimonial.model.js'
import { sendMail } from "../services/nodemailer.js"
import { validationResult } from "express-validator";
export const send_testimonial = async (req, res) => {
    const { uid, firstname, lastname, email, phone, message, date, photoimage } = req.body;
    const Errors = validationResult(req);
    // // Body Validation Before Searching in the database to increase performance
    if (!Errors.isEmpty()) {
        return res.json({
            Status: FAILD,
            Status_Code: FAILD_CODE,
            message: "Can't Send Testimonial please Try again later",
            data: Errors.array().map((arr) => arr.msg),
        });
    }
    try {
        const oldUser = User.find({ email })
        if (!oldUser) {
            return res.json({ error: "User Exists" });
        }
        await Testimonial.create({
            _id: uid,
            firstname,
            lastname,
            email,
            phone,
            message,
            date,
            photoimage
            // photoimage:oldUser.phone,
        });
        await sendMail(oldUser.email, 'contact')
        return res.send({ status: "Sending successful" });
    }
    catch (error) {
        return res.send({ status: "Error Sending" });
    }
}
export const testimonialData = async (req, res) => {
    // const { userID } = req.body;
    try {
        const allTestimonial = await Testimonial.find({})
        // const allTestimonial = await Testimonial.find({
        //     'senderId':
        //     {
        //         $in: [`${userID}`]
        //     }
        // });
        return res.send({ status: "ok", data: allTestimonial });
    } catch (error) {
        return res.send(error);
        // res.status(500).json({ message: 'Failed to retrieve Testimonial' });
    }
}
export const clear_testimonial = async (req, res) => {
    const { selectedid } = req.body;
    const Errors = validationResult(req);
    // // Body Validation Before Searching in the database to increase performance
    if (!Errors.isEmpty()) {
        return res.json({
            Status: FAILD,
            Status_Code: FAILD_CODE,
            message: "Can't Clear Testimonial please Try again later",
            data: Errors.array().map((arr) => arr.msg),
        });
    }
    try {
        await Testimonial.deleteMany({ 'senderId': { $in: `${selectedid}` } });

        return res.send({ status: "Ok", data: "Deleted" });
    } catch (error) {
        return res.send({ status: "Error", data: 'Failed to Clearing Testimonial' });
    }
}
export default { send_testimonial, clear_testimonial, testimonialData }