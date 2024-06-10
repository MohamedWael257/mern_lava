import mongoose from "mongoose";
const ServicesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    serviceprice: {
        type: Number,
        required: true,
    },
    serviceduration: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    ImageUrl: {
        type: String,
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

const Services = mongoose.model('services', ServicesSchema);
export default Services