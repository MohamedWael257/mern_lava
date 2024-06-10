import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";

const initialState = {
    carsdata: [],
    minPrice: 5,
    maxPrice: 5,
}
export const getCars = createAsyncThunk('cars/getCars', async () => {
    return fetch(`${process.env.BASE_API_URL_HOST}/products/carsData`)
        .then((respons) => { return respons.json() })
});
const carslice = createSlice({
    name: "cars",
    initialState,
    reducers: {
        pricecarrange(state) {
            const pricearray = [];
            state.carsdata.map((pro) => {
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
        builder.addCase(getCars.pending, () => { })
        builder.addCase(getCars.fulfilled, (state, action) => {
            state.carsdata = []
            for (const key in action.payload) {
                state.carsdata.push({
                    id: action.payload[key]._id,
                    title: action.payload[key].name,
                    description: action.payload[key].description,
                    bodyStyle: action.payload[key].bodyStyle,
                    model: action.payload[key].model,
                    price: action.payload[key].price,
                    color: action.payload[key].color,
                    ImageUrl: action.payload[key].ImageUrl,
                    itemquantity: action.payload[key].itemquantity,
                    favourit: action.payload[key].favourit,
                    serviceprice: action.payload[key].serviceprice

                })
            }

        })
        builder.addCase(getCars.rejected, () => { })
    }
});
export default carslice;
export const { pricecarrange, shuffle } = carslice.actions
export const carsdata = (state) => state.cars.carsdata;
export const suffledata = (state) => state.cars.sufflecars;
export const minrange = (state) => state.cars.minPrice;
export const maxringe = (state) => state.cars.maxPrice;
