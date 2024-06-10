import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authslice from './slice/authslice';
import cartslice from './slice/cartslice';
import filterslice from './slice/filterslice';
import orderslice from './slice/orderslice';
import bookingslice from './slice/bookingslice';
import favouritslice from './slice/favouritslice';
import serviceslice from './slice/serviceslice';
import notificationlice from './slice/notificationslice'
import carslice from './slice/carsslice';
import accessorieslice from './slice/accessoriesslice';
import productsslice from './slice/productsslice';
import wishlistslice from './slice/wishlistslice';
const rootreducer = combineReducers({
    auth: authslice.reducer,
    cart: cartslice.reducer,
    products: productsslice.reducer,
    cars: carslice.reducer,
    accessories: accessorieslice.reducer,
    service: serviceslice.reducer,
    wishlist: wishlistslice.reducer,
    order: orderslice.reducer,
    filter: filterslice.reducer,
    booking: bookingslice.reducer,
    favourit: favouritslice.reducer,
    notification: notificationlice.reducer
});
const store = configureStore({
    reducer: rootreducer
})
export default store;