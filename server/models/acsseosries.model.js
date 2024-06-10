import mongoose from 'mongoose';
const AccessoriesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    itemquantity: {
        type: Number,
        required: true,
    },
    favourit: {
        type: Boolean,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    ImageUrl: {
        type: String,
        required: true,
    },
    // rating: {
    //     rate: { type: Number, require: true, default: 0 },
    //     rate_Count: { type: Number, require: true, default: 0 },
    //     count: { type: Number, require: true, default: 0 },
    //     N_of_Watches: { type: Number, require: true, default: 0 },
    //     N_of_Buy: { type: Number, require: true, default: 0 },
    //     N_of_Likes: { type: Number, require: true, default: 0 },
    // },
});

const Accessories = mongoose.model('accessories', AccessoriesSchema);
export default Accessories