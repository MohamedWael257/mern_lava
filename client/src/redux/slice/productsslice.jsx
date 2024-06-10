import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";

const initialState = {
    productsdata: [],
    minPrice: 5,
    maxPrice: 5,
}
export const getProducts = createAsyncThunk('products/getProducts', async () => {
    return fetch(`${process.env.BASE_API_URL_HOST}/products/productsData`)
        .then((respons) => { return respons.json() })
});
const productsslice = createSlice({
    name: "products",
    initialState,
    reducers: {
        pricerange(state) {
            const pricearray = [];
            state.productsdata.map((pro) => {
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
        builder.addCase(getProducts.pending, () => { })
        builder.addCase(getProducts.fulfilled, (state, action) => {
            state.productsdata = []
            for (const key in action.payload) {
                state.productsdata.push({
                    id: action.payload[key]._id,
                    title: action.payload[key].name,
                    description: action.payload[key].description,
                    price: action.payload[key].price,
                    brand: action.payload[key].brand,
                    ImageUrl: action.payload[key].ImageUrl,
                    category: action.payload[key].category,
                    itemquantity: action.payload[key].itemquantity,
                    favourit: action.payload[key].favourit,
                    rating: action.payload[key].rating,
                })
            }

        })
        builder.addCase(getProducts.rejected, () => { })
    }
});
export default productsslice;
export const { pricerange, shuffle } = productsslice.actions
export const productsdata = (state) => state.products.productsdata;
export const suffledata = (state) => state.products.suffleproducts;
export const minrange = (state) => state.products.minPrice;
export const maxringe = (state) => state.products.maxPrice;
