import mongoose from "mongoose";

const WishlistSchema = new mongoose.Schema(
    {
        uid: { type: mongoose.Types.ObjectId, require: true },
        product_ID: { type: mongoose.Types.ObjectId, require: true },
    },
);

const Wishlist = mongoose.model('wishlist', WishlistSchema);
export default Wishlist