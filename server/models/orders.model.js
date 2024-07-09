import mongoose from "mongoose";

const OrdersSchema = new mongoose.Schema({
    orderamount: { type: Number, required: true },
    orderdate: { type: String, required: true },
    uid: { type: String, required: true },
    orderitem: { type: Array, required: true }
});

const Orders = mongoose.model('orders', OrdersSchema);
export default Orders