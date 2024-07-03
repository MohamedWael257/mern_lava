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
            { uid: currentUser?._id, date: time, price: totprice, title: 'Online Booking', description: "Booking" })
            .then(res => console.log(res))
            .catch(err => console.log(err))
        toast.info("Check Your Notification", {
            position: "bottom-right",
        });
        navigate("/")
        // navigate('/orders')

    }
    return (

        <section className='checkout'>
            <div className="payment">
                <div className="payment-widget">
                    <h3 className='payment-widget-title'>Billing Address</h3>
                    <div className="payment-form">
                        <div className="form-group">
                            <label>First Name</label>
                            <input type="text" className="form-control" placeholder="Your First Name" />
                        </div>
                        <div className="form-group">
                            <label>Last Name</label>
                            <input type="text" className="form-control" placeholder="Your Last Name" />
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input type="email" className="form-control" placeholder="Your Email" />
                        </div>
                        <div className="form-group">
                            <label>Phone</label>
                            <input type="text" className="form-control" placeholder="Your Phone" />
                        </div>
                        <div className="form-group">
                            <label>Address</label>
                            <input type="text" className="form-control" placeholder="Your Address" />
                        </div>
                    </div>
                </div>
                <div className="payment-widget">
                    <h3 className='payment-widget-title'>Payment Info</h3>
                    <div className="payment-form">
                        <div className="form-group">
                            <label>Card Holder Name</label>
                            <input type="text" className="form-control" placeholder="Name On Card" />
                        </div>
                        <div className="form-group">
                            <label>Card Number</label>
                            <input type="text" className="form-control" placeholder="Your Card Number" />
                        </div>
                        <div className="form-group">
                            <label>Expire Date</label>
                            <input type="text" className="form-control" placeholder="Expire" />
                        </div>
                        <div className="form-group">
                            <label>CCV</label>
                            <input type="text" className="form-control" placeholder="CVV" />
                        </div>
                    </div>
                </div>
                <div className="payment-widget">
                    <h3 className='payment-widget-title'>Shipping Address</h3>
                    <div className="payment-form">
                        <div className="form-group">
                            <label>First Name</label>
                            <input type="text" className="form-control" placeholder="Your First Name" />
                        </div>
                        <div className="form-group">
                            <label>Last Name</label>
                            <input type="text" className="form-control" placeholder="Your Last Name" />
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input type="email" className="form-control" placeholder="Your Email" />
                        </div>
                        <div className="form-group">
                            <label>Phone</label>
                            <input type="text" className="form-control" placeholder="Your Phone" />
                        </div>
                        <div className="form-group">
                            <label>Address 1</label>
                            <input type="text" className="form-control" placeholder="Your Address" />
                        </div>
                        <div className="form-group">
                            <label>Address 2</label>
                            <input type="text" className="form-control" placeholder="Your Address" />
                        </div>
                        <div className="col-lg-12">
                            <div className="form-group">
                                <label>Additional Info</label>
                                <textarea className="form-control" cols="30" rows="5" placeholder="Additional Info"></textarea>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
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
