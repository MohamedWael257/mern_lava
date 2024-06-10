import mongoose from "mongoose";

const RateSchema = new mongoose.Schema(
    {
        uid: { type: mongoose.Types.ObjectId, require: true },
        product_ID: { type: mongoose.Types.ObjectId, require: true },
        rate: { type: Number, require: true },
    },
);
const Rate = mongoose.model('rate', RateSchema);
export default Rate
