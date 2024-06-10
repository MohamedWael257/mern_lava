import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
const initialState = {
    notificationshistory: [],
    minPrice: 5,
    maxPrice: 5,
}
export const getNotification = createAsyncThunk('notification/getNotification', async () => {
    const { currentUser } = useContext(AuthContext)
    return fetch(`${process.env.BASE_API_URL_HOST}/notification/notificationData/${currentUser?._id}`)
        .then((respons) => { return respons.json() })
});
const notificationlice = createSlice({
    name: "notification",
    initialState,
    reducers: {
        pricerange(state) {
            const pricearray = [];
            state.notificationshistory.map((pro) => {
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
        builder.addCase(getNotification.pending, () => { })
        builder.addCase(getNotification.fulfilled, (state, action) => {
            state.notificationshistory = []
            for (const key in action.payload) {
                state.notificationshistory.push({
                    id: action.payload[key]._id,
                    title: action.payload[key].title,
                    description: action.payload[key].description,
                    price: action.payload[key].price,
                    date: action.payload[key].date,

                })
            }

        })
        builder.addCase(getNotification.rejected, () => { })
    }
});
export default notificationlice;
export const { pricerange, shuffle } = notificationlice.actions
export const notificationshistory = (state) => state.notification.notificationshistory;
export const suffledata = (state) => state.notification.sufflenotification;
export const minrange = (state) => state.notification.minPrice;
export const maxringe = (state) => state.notification.maxPrice;
