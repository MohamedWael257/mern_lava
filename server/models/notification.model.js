import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema({
    uid: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    date: {
        type: String,
        required: true
    }
});

const Notification = mongoose.model('notification', NotificationSchema);
export default Notification