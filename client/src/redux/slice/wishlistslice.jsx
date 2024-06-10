import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";

const initialState = {
    wishlistdata: [],
}
export const getWishlist = createAsyncThunk('wishlist/getWishlist', async () => {
    return fetch(`${process.env.BASE_API_URL_HOST}/wishlist/wishlistData`)
        .then((respons) => { return respons.json() })
});
const wishlistslice = createSlice({
    name: "wishlist",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getWishlist.pending, () => { })
        builder.addCase(getWishlist.fulfilled, (state, action) => {
            state.wishlistdata = []
            for (const key in action.payload) {
                state.wishlistdata.push({
                    id: action.payload[key]._id,
                    uid: action.payload[key].uid,
                    product_ID: action.payload[key].product_ID,
                })
            }

        })
        builder.addCase(getWishlist.rejected, () => { })
    }
});
export default wishlistslice;
export const wishlistdata = (state) => state.wishlist.wishlistdata;

