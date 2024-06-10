import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";

const initialState = {
    accessoriesdata: [],
    minPrice: 5,
    maxPrice: 5,
}
export const getAccessories = createAsyncThunk('accessories/getAccessories', async () => {
    return fetch(`${process.env.BASE_API_URL_HOST}/products/accessoriesData`)
        .then((respons) => { return respons.json() })
});
const accessorieslice = createSlice({
    name: "accessories",
    initialState,
    reducers: {
        priceaccessoriesrange(state) {
            const pricearray = [];
            state.accessoriesdata.map((pro) => {
                const price = pro.price;
                return pricearray.push(price);
            })
            const max = Math.max(...pricearray);
            const min = Math.min(...pricearray);
            state.minPrice = min;
            state.maxPrice = max;
        },

    },
    extraReducers: (builder) => {
        builder.addCase(getAccessories.pending, () => { })
        builder.addCase(getAccessories.fulfilled, (state, action) => {
            state.accessoriesdata = []
            for (const key in action.payload) {
                state.accessoriesdata.push({
                    id: action.payload[key]._id,
                    title: action.payload[key].title,
                    description: action.payload[key].description,
                    price: action.payload[key].price,
                    ImageUrl: action.payload[key].ImageUrl,
                    itemquantity: action.payload[key].itemquantity,
                    favourit: action.payload[key].favourit

                })
            }

        })
        builder.addCase(getAccessories.rejected, () => { })
    }
});
export default accessorieslice;
export const { priceaccessoriesrange, shuffle } = accessorieslice.actions
export const accessoriesdata = (state) => state.accessories.accessoriesdata;
export const suffledata = (state) => state.accessories.suffleaccessories;
export const minrange = (state) => state.accessories.minPrice;
export const maxringe = (state) => state.accessories.maxPrice;
