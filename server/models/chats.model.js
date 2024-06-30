import mongoose from "mongoose";

const ChatsSchema = new mongoose.Schema({
    senderId: {
        type: String,
        required: true,
    },
    receiverId: {
        type: String,
        required: true,
    },
    message: {
        type: Array,
        required: true,
    },
    timestamp: {
        type: Date,
        required: true
    },
    ImageUrl: {
        type: String,
        default: ""
    }
});

const Chats = mongoose.model('chat', ChatsSchema);
export default Chats