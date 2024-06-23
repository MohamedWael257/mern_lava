import React, { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { bookingitem, clearcart, getbooking, totalprice } from '../../../redux/slice/bookingslice'
import { useNavigate } from 'react-router-dom'
import './Bookingconfirm.css'
import { AuthContext } from '../../../context/AuthContext'
import { toast } from 'react-toastify'
import axios from 'axios'
import { getNotification } from '../../../redux/slice/notificationslice'
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
            { uid: currentUser?._id, date: time, price: totprice, title: 'Online Booking', description: "Booking" })
            .then(res => console.log(res))
            .catch(err => console.log(err))
        dispatch(getNotification());
        toast.info("Check Your Notification", {
            position: "bottom-right",
        });
        navigate("/")
        // navigate('/orders')

    }
    return (

        <section className='checkout'>
            <div className="confirm cart-summary">
                <h4 className="mb-30">Booking Summary</h4>
                {booking && booking.length > 0 &&
                    <ul>
                        {booking.map(ele => {
                            return (
                                <>
                                    <li><strong>Date:</strong> <span className='text-neutral-500'>{ele.time}</span></li>
                                    <li><strong>Details:</strong> <span className='text-neutral-500'>{ele.title}</span></li>
                                    <li><strong>Service Duration:</strong> <span className='text-neutral-500'>{ele.serviceduration} </span></li>
                                    <li><strong>Service Price:</strong> <span className='text-neutral-500'>{ele.serviceprice} EGB</span></li>
                                    <li><strong>Tax:</strong> <span className='text-neutral-500'>{ele.tax} EGB</span></li>
                                    <li className="cart-total Total"><strong>Total Pay:</strong> <span className='text-[#2db7ff]'>{ele.totprice} EGB</span></li>
                                </>
                            )
                        })}
                    </ul>
                }
                <div className="text-end mt-6">
                    <button className="theme-btn" onClick={payment}>Confirm Payment <i className="far fa-arrow-right"></i></button>
                </div>
            </div>
        </section>
    )
}

export default Bookingconfirm
