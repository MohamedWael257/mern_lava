import React, { useContext, useEffect, useState } from 'react'
import './Profilenav.css'
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';
import { toast } from 'react-toastify';
import { FaUserCircle } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { ordershistory } from '../../../redux/slice/orderslice';
import Loader from '../../loader/Loader'
import { bookingshistory } from '../../../redux/slice/bookingslice';
import axios from 'axios';
import Cookies from 'universal-cookie';

const Profilenav = ({ setActiveside }) => {
    const cookies = new Cookies();
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    // const [activeside, setActiveside] = useState(false)
    const { currentUser } = useContext(AuthContext)
    const getorders = useSelector(ordershistory)
    const getbooking = useSelector(bookingshistory)
    const [orders, setOrders] = useState(false)
    const [booking, setBooking] = useState(false)

    useEffect(() => {
        if (getorders) {
            const res = getorders.filter(ele => ele.uid === currentUser?.uid)
            setOrders(res)
        }
    }, [getorders])
    useEffect(() => {
        if (getbooking) {
            const res = getbooking.filter(ele => ele.uid === currentUser?.uid)
            setBooking(res)
        }
    }, [getbooking])

    const logouthandler = async () => {
        cookies.remove("TOKEN");
        toast.success("logout succeessful...")
        window.location.href = "../login";

    }
    const deleteaccount = async () => {
        setLoading(true)
        await axios.post(`${process.env.BASE_API_URL_HOST}/auth/deleteUser`, { userid: currentUser?.uid })
            .then((res) => {
                toast.success("Delete Account Succeessfully")
                setLoading(false)
            })
            .catch(err => {
                toast.error(err)
                setLoading(false)
            })
    }
    const activelink = ({ isActive }) => (isActive ? `active` : `links`)
    const activeside = ({ isActive }) => (isActive ? setActiveside(true) : setActiveside(false))
    return (
        <>
            {loading ? <Loader />
                : <div className='nav'>
                    <div className='user'>
                        {currentUser?.photoimage ?
                            <img src={currentUser?.photoimage} className='icon inline-block' width={60} />
                            :
                            <FaUserCircle className='icon inline-block' size={60} color="#fff" />
                        }
                        {/* <img src={currentUser?.photoimage} alt="" /> */}
                        <h4>{currentUser?.username}</h4>
                    </div>
                    <div className='listcontainer'>
                        <ul className='list'>
                            <li>
                                <NavLink className={activelink} to='/profile/security'>
                                    Personal Info
                                </NavLink>
                            </li>
                            <li>
                                <NavLink className={activelink} to='/profile/orders'>
                                    My Orders
                                </NavLink>
                            </li>
                            <li>
                                <NavLink className={activelink} to='/profile/booking'>
                                    My Booking
                                </NavLink>
                            </li>
                            {/* <li>
                                <NavLink className={activelink} to='/profile/security'>
                                    security
                                </NavLink>
                            </li> */}
                            <li>
                                <NavLink className={activelink} to='/profile/notification'>
                                    notification
                                </NavLink>
                            </li>
                            <li>
                                <NavLink className={activeside} to='/profile/chat'>
                                    chat
                                </NavLink>
                            </li>
                            <li>
                                <NavLink className={activelink} to='/profile/wishlists'>
                                    Wishlists
                                </NavLink>
                            </li>
                            <li>
                                <button onClick={logouthandler}>Logout</button>
                            </li>
                            <li>
                                <button onClick={deleteaccount}>delete accout</button>
                            </li>
                        </ul>
                    </div>
                </div>

            }

        </>
    )
}

export default Profilenav