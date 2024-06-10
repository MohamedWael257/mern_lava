import { validationResult } from "express-validator";
import Notification from "../models/notification.model.js";
export const notificationData = async (req, res) => {
    const { id } = req.params;
    const Errors = validationResult(req);
    if (!Errors.isEmpty()) {
        return res.json({
            status: FAILD,
            status_Code: FAILD_CODE,
            message: "Can't Get your notificationData please Try again later",
            data: Errors.array().map((arr) => arr.msg),
        });
    }
    try {
        const allNotification = await Notification.find({ uid: id })
        // const allNotification = await Notification.find({})

        return res.status(201).json(allNotification);
    } catch (error) {
        return res.status(500).json({ message: 'Failed to retrieve Notification' });
    }
}
export const add_notification = async (req, res) => {
    const { uid, title, description, price, date } = req.body;
    const Errors = validationResult(req);
    if (!Errors.isEmpty()) {
        return res.json({
            status: FAILD,
            status_Code: FAILD_CODE,
            message: "Can't Add Message to notificationData  please Try again later",
            data: Errors.array().map((arr) => arr.msg),
        });
    }
    try {
        await Notification.create({
            uid,
            title,
            description,
            price,
            date,
        });
        return res.send({ status: "Notification added successful" });
    }
    catch (error) {
        return res.send({ status: "Error Notification" });
    }
}
export const clear_notification = async (req, res) => {
    const { notificationId } = req.body;
    const Errors = validationResult(req);
    if (!Errors.isEmpty()) {
        return res.json({
            status: FAILD,
            status_Code: FAILD_CODE,
            message: "Can't Clear Message from notificationData  please Try again later",
            data: Errors.array().map((arr) => arr.msg),
        });
    }
    try {
        await Notification.deleteMany({ uid: notificationId });
        return res.status(201).json({ message: 'Notification deleted successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'Failed to delete Notification' });
    }
}
