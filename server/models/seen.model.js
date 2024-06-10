import mongoose from "mongoose";

const SeenSchema = new mongoose.Schema(
    {
        uid: { type: mongoose.Types.ObjectId, require: true },
        product_ID: { type: mongoose.Types.ObjectId, require: true },
    },
);

const Seen = mongoose.model('seen', SeenSchema);
export default Seen