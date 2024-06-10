import React, { useContext, useEffect, useState } from 'react'
import './Profile.css'
import Profilenav from './profilenav/Profilenav'
import { Route, Routes } from 'react-router-dom'
import OrdersPage from '../../pages/orderspage/OrdersPage'
import SecurityPage from '../../pages/securitypage/SecurityPage'
import ChatPage from '../../pages/chatpage/ChatPage'
import Notification from '../notification/Notification'
import BookingOrdersPage from '../../pages/orderspage/BookingOrdersPage'
import { FiMenu } from 'react-icons/fi'
import { AuthContext } from '../../context/AuthContext'
import Wishlists from '../wishlists/Wishlists'
const Profile = () => {
    const [activeside, setActiveside] = useState(false)
    const { currentUser } = useContext(AuthContext)

    return (
        <>
            {/* <div className='profile'> */}

            <div className={`${activeside ? 'active profile' : 'profile'}`} >
                <div className='navbar'>
                    {/* <div className={`${activeside ? 'navabr hidden' : 'navbar'}`}> */}
                    < Profilenav setActiveside={setActiveside} />
                </div>
                <div className='content'>
                    <Routes>
                        <Route path="orders" element={<OrdersPage />} />
                        <Route path="booking" element={<BookingOrdersPage />} />
                        <Route path="security" element={<SecurityPage />} />
                        <Route path="notification" element={<Notification />} />
                        <Route path="chat" element={<ChatPage />} />
                        <Route path="wishlists" element={<Wishlists />} />

                    </Routes>
                </div>
            </div>
        </>
    )
}

export default Profile