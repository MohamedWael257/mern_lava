import { configureStore, combineReducers } from '@reduxjs/toolkit';
import cartslice from './slice/cartslice';
import filterslice from './slice/filterslice';
import orderslice from './slice/orderslice';
import bookingslice from './slice/bookingslice';
import serviceslice from './slice/serviceslice';
import notificationlice from './slice/notificationslice'
import productsslice from './slice/productsslice';
import wishlistslice from './slice/wishlistslice';
const rootreducer = combineReducers({
    cart: cartslice.reducer,
    products: productsslice.reducer,
    service: serviceslice.reducer,
    wishlist: wishlistslice.reducer,
    order: orderslice.reducer,
    filter: filterslice.reducer,
    booking: bookingslice.reducer,
    notification: notificationlice.reducer
});
const store = configureStore({
    reducer: rootreducer
})
export default store;