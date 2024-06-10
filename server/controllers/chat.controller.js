import Chats from "../models/chats.model.js";
// const User = require('../models/user.model')
import installTimestamp from 'install-timestamp';
const ts = installTimestamp();
export const add_chat = async (req, res) => {
    const { senderId, receiverId, message } = req.body;
    try {
        await Chats.create({
            senderId,
            receiverId,
            message,
            // imageUrl,
            timestamp: ts
        });
        return res.send({ status: "Payment successful" });
    }
    catch (error) {
        return res.send({ status: "Error Payment" });
    }
}
export const chatsData = async (req, res) => {
    const { userid, selectedid } = req.body;
    try {
        const allChats = await Chats.find({ 'senderId': { $in: [`${userid}`, `${selectedid}`] }, 'receiverId': { $in: [`${userid}`, `${selectedid}`] } });
        return res.send({ status: "ok", data: allChats });
    } catch (error) {
        return res.send(error);
        // res.status(500).json({ message: 'Failed to retrieve chats' });
    }
}
export const clear_chat = async (req, res) => {
    const { userid, selectedid } = req.body;
    try {
        await Chats.deleteMany({ 'senderId': { $in: [`${userid}`, `${selectedid}`] }, 'receiverId': { $in: [`${userid}`, `${selectedid}`] } });

        // Chats.deleteMany({ senderId: { $in: [userid, selectedid] } }, function (err, res) {
        //     console.log(err);
        // });
        // Chats.deleteMany({ senderId: { $nin: [userid, selectedid] } }, function (err, res) {
        //     console.log(err);
        // });
        return res.send({ status: "Ok", data: "Deleted" });
    } catch (error) {
        return res.send({ status: "Error", data: 'Failed to Clearing chats' });
    }
}
