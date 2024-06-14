import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const initialState = {
    wishlistdata: [],
}
export const getWishlist = createAsyncThunk('wishlist/getWishlist', async () => {
    const { currentUser } = useContext(AuthContext)
    const uid = currentUser?._id
    return axios.get(`${process.env.BASE_API_URL_HOST}/wishlist/wishlistData`), { uid: uid }
        .then((respons) => { return respons.data })
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

