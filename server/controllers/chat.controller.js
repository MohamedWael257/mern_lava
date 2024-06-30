import Chats from "../models/chats.model.js";
// const User = require('../models/user.model')
import installTimestamp from 'install-timestamp';
const ts = installTimestamp();
import keys from "../config/keys.js"
const { apiURL } = keys.app

export const add_chat = async (req, res) => {
    const { senderId, receiverId, message, timestamp, image } = req.body;
    // console.log(image);
    try {
        if (image) {
            await Chats.create({
                senderId,
                receiverId,
                message,
                // ImageUrl: `${apiURL}/uploads/chats/${req.file.filename}`,
                timestamp
            });
            // console.log(image);
            return res.send({ status: "Send Chat successful" });

        }
        else {
            await Chats.create({
                senderId,
                receiverId,
                message,
                ImageUrl: `${apiURL}/uploads/chats/${req.file.filename}`,
                timestamp
            });
            return res.send({ status: "Send Chat successful" });

        }
    }
    catch (error) {
        return res.send({ status: error.message });
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
        return res.send({ status: "Ok", data: "Messages is Deleted" });
    } catch (error) {
        return res.send({ status: "Error", data: 'Failed to Clearing chats' });
    }
}
