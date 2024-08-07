import React, { Fragment, useContext, useEffect, useState } from 'react'
import './Checkout.css'
import { useNavigate, useParams } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { AuthContext } from '../../context/AuthContext'
import { cartitem, clearcart, totalprice } from '../../redux/slice/cartslice'
import { getorders } from '../../redux/slice/orderslice';
import axios from 'axios';
import { getProducts } from '../../redux/slice/productsslice';
const Checkout = () => {
    const cart = useSelector(cartitem);
    const totprice = useSelector(totalprice);
    const dispatch = useDispatch()
    const { currentUser } = useContext(AuthContext)
    const navigate = useNavigate()
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date + ' ' + time;
    var shipping_cost = cart.length * 35
    var { discount, carttotal, vat } = useParams();
    const [cart_total, setCart_total] = useState(+carttotal + shipping_cost)
    const payment = async (e) => {
        e.preventDefault();
        await axios.post(`${process.env.BASE_API_URL_HOST}/store/checkout`, {
            orderdate: dateTime, orderamount: cart_total, uid: currentUser?._id, orderitem: cart
        })
            .then(res => {
                toast.success("Payment successful", {
                    position: "top-right",
                });
                dispatch(getorders());
                dispatch(clearcart());
                dispatch(getProducts())
            })
            .catch(err => toast.error(err.message))

        const time = Date.now()
        await axios.post(`${process.env.BASE_API_URL_HOST}/notification/add-notification`, {
            uid: currentUser?._id, date: time, price: totprice, title: 'Shopping', description: 'Orders'
        })
            .then(res => {
                toast.info("Check Your Notification", {
                    position: "bottom-right",
                });
                navigate("/")
            })
            .catch(err => toast.error(err.message))
    }
    useEffect(() => {
        if (cart.length === 0) {
            navigate('/')
        }
    }, [cart])

    return (
        <>
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
                    <h4 className="mb-30">Cart Summary</h4>
                    <ul>
                        <li><strong>Product Qty:</strong> <span className='text-neutral-500'>{cart.length}</span></li>
                        <li><strong>Shipping Cost:</strong> <span className='text-neutral-500'>{shipping_cost} EGB</span></li>
                        <li><strong>Discount:</strong> <span className='text-neutral-500'>{discount} EGB</span></li>
                        <li><strong>Vat:</strong> <span className='text-neutral-500'>{vat} EGB</span></li>
                        <li><strong>Sub Total:</strong> <span className='text-neutral-500'>{totprice} EGB</span></li>
                        <li className="cart-total"><strong>Total Pay:</strong> <span className='text-[#2db7ff]'>{cart_total} EGB</span></li>
                    </ul>
                    <div className="text-end mt-6">
                        <button className="theme-btn" onClick={payment}>Confirm Payment <i className="far fa-arrow-right"></i></button>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Checkout