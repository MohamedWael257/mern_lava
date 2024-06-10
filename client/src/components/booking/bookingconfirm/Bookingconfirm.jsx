import React, { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { bookingitem, clearcart, getbooking, totalprice } from '../../../redux/slice/bookingslice'
import { useNavigate } from 'react-router-dom'
import './Bookingconfirm.css'
import { AuthContext } from '../../../context/AuthContext'
import { toast } from 'react-toastify'
import axios from 'axios'
const Bookingconfirm = () => {
    const booking = useSelector(bookingitem)
    const totprice = useSelector(totalprice)
    const { currentUser } = useContext(AuthContext)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const uid = currentUser?._id
    useEffect(() => {
        if (booking.length === 0) {
            navigate('/')
        }
    }, [booking])
    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')
    useEffect(() => {
        if (booking && booking.length > 0) {
            booking.map(ele => {
                setDesc(ele.description)
                setTitle(ele.title)
            })
        }
    }, [])
    const payment = async (e) => {
        e.preventDefault();
        const serverTimestamp = new Date().toISOString();
        await axios.post(`${process.env.BASE_API_URL_HOST}/booking/booking`, {
            bookingamount: totprice, bookingdate: serverTimestamp, uid: uid, bookingitem: booking
        })
            .then(res => toast.success(res.data.message, {
                position: "top-right",
            }))
            .catch(err => toast.error(err.message))
        dispatch(getbooking());
        dispatch(clearcart());
        const time = Date.now()
        await axios.post(`${process.env.BASE_API_URL_HOST}/notification/add-notification`,
            { uid: currentUser?._id, date: time, price: totprice, title: title ? title : 'Online Booking', description: desc ? desc : "booking" })
            .then(res => console.log(res))
            .catch(err => console.log(err))
        // dispatch(getNotification());
        toast.info("Check Your Notification", {
            position: "bottom-right",
        });
        navigate("/")
        // navigate('/orders')

    }
    return (
        <section className='booking-payment flex items-center justify-center'>
            <div className='w-[380px] h-[380px] p-5 rounded-xl'>
                <h2>Payment Total</h2>
                {
                    booking && booking.length > 0 &&
                    booking.map(ele => {
                        return (
                            <>
                                <div className='flex justify-between'>
                                    <p>Date</p>
                                    <p>{ele.time}</p>
                                </div>
                                <div className='flex justify-between'>
                                    <p>Details</p>
                                    <p>{ele.title}</p>
                                </div>
                                <div className='flex justify-between'>
                                    <p>Service Duration</p>
                                    <p>{ele.serviceduration}</p>
                                </div>
                                <hr />
                                <div className='flex justify-between'>
                                    <p>Service Price</p>
                                    <p>{ele.serviceprice} EGB</p>
                                </div>
                                <div className='flex justify-between'>
                                    <p>Tax</p>
                                    <p>{ele.tax} EGB</p>
                                </div>
                                <div className='flex justify-between'>
                                    <p>Total</p>
                                    <p>{ele.totprice} EGB</p>
                                </div>
                                <div className='flex justify-between'>
                                    <p>Payment Method</p>
                                    <p>cash</p>
                                </div>
                            </>
                        )
                    })
                }
                <button onClick={payment}>Confirm Booking</button>
            </div>
        </section>
    )
}

export default Bookingconfirm
