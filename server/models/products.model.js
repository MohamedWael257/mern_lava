import mongoose from "mongoose";

const ProductsSchema = new mongoose.Schema(
    {
        name: { type: String, require: true },
        description: { type: String, require: true },
        price: { type: Number, require: true },
        brand: { type: String, require: true },
        ImageUrl: { type: String, require: true, default: "Uploads/Product.jpg" },
        category: { type: String, require: true },
        itemquantity: { type: Number, default: 1 },
        favourit: { type: Boolean, default: false },
        rating: {
            rate: { type: Number, default: 0 },
            rate_Count: { type: Number, default: 0 },
            count: { type: Number, default: 0 },
            N_of_Watches: { type: Number, default: 0 },
            N_of_Buy: { type: Number, default: 0 },
            N_of_Likes: { type: Number, default: 0 },
        },
    },
);

const Products = mongoose.model('products', ProductsSchema);
export default Products
