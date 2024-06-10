import React, { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import { bookingitem, clearcart, getbooking, totalprice } from '../../../redux/slice/bookingslice'
import { Link, useNavigate } from 'react-router-dom'
// import './BookingOrders.css'
import { AuthContext } from '../../context/AuthContext'
import { toast } from 'react-toastify'
import axios from 'axios'
const BookingOrders = () => {
    const { currentUser } = useContext(AuthContext)
    const [booking, setBooking] = useState([])
    const id = currentUser?._id
    useEffect(() => {
        const getbookingOrders = async () => {
            await axios.get(`${process.env.BASE_API_URL_HOST}/booking/bookingData/${id}`)
                .then(res => setBooking(res.data))
                .catch(err => toast.error(err.message))
        }
        getbookingOrders();
    }, [])
    return (
        <>
            <section className='orders'>
                {booking ?
                    <>
                        <h2>Hello {currentUser?.username}</h2>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>s/n</th>
                                    <th>Service</th>
                                    <th>servicePrice</th>
                                    <th>TAX</th>
                                    <th>Date</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {booking.map((ele, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{index}</td>
                                            {
                                                ele.bookingitem.map(e => {
                                                    return (
                                                        <>
                                                            <td>{e.title}</td>
                                                            <td>{e.serviceprice} EGB</td>
                                                            <td>{e.tax} EGB</td>
                                                        </>
                                                    )
                                                })
                                            }
                                            <td>{ele.bookingdate}</td>
                                            <td>{+ele.bookingamount} EGB</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </>
                    : <>
                        <h2>Hello {currentUser?.username}</h2>
                        <div className="noorders">
                            <h1><i className="fa-solid fa-heart-crack"></i></h1>
                            <h5 >Order history is empty !</h5>
                            <p >push some products into your cart</p>
                            <div>
                                <Link to='/' className="btn btn-warning text-end">Back to Home</Link>
                            </div>
                        </div>
                    </>

                }
            </section>
        </>
    )
}

export default BookingOrders