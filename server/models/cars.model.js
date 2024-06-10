import mongoose from "mongoose";
const CarsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    bodyStyle: {
        type: String,
        required: true
    },
    model: {
        type: Array,
        required: true,
    },
    price: {
        type: Number,
        required: true,

    },
    color: {
        type: Array,
        // required: true,
        default: ["red",
            "green",
            "yellow",
            "blue",
            "black"]
    },
    description: {
        type: String,
        required: true,
    },
    itemquantity: {
        type: Number,
        // required: true,
    },
    favourit: {
        type: Boolean,
        // required: true,
    },
    ImageUrl: {
        type: String,
        required: true,
    },
    serviceprice: {
        type: Number,
        required: true
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
const Cars = mongoose.model('car', CarsSchema);
export default Cars
