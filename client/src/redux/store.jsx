import { configureStore, combineReducers } from '@reduxjs/toolkit';
import cartslice from './slice/cartslice';
import filterslice from './slice/filterslice';
import orderslice from './slice/orderslice';
import bookingslice from './slice/bookingslice';
import serviceslice from './slice/serviceslice';
import productsslice from './slice/productsslice';
import userslice from './slice/userslice';
const rootreducer = combineReducers({
    users: userslice.reducer,
    cart: cartslice.reducer,
    products: productsslice.reducer,
    service: serviceslice.reducer,
    order: orderslice.reducer,
    filter: filterslice.reducer,
    booking: bookingslice.reducer,
});
const store = configureStore({
    reducer: rootreducer
})
export default store;