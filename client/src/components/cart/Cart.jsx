import React, { Fragment, useEffect, useState } from 'react'
import "./Cart.css"
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { FaCheck } from 'react-icons/fa'
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { addtocart, cartitem, clearcart, decrease, removefromcart, totalprice, totalquantity } from '../../redux/slice/cartslice'
import { PiHeartBreakFill } from "react-icons/pi";
import Recommendation from '../home/homeitems/recommendation/Recommendation'
import HeroCard from '../ui/herocard/HeroCard'

const Cart = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const cart = useSelector(cartitem)
    const totprice = useSelector(totalprice)
    const totquantity = useSelector(totalquantity)
    const [coupon, setCoupon] = useState('')
    const [activecoupon, setActivecoupon] = useState(false)

    const [vat, setVat] = useState(0)
    const [discount, setDiscount] = useState(0)
    const [cart_total, setCart_total] = useState(0)

    useEffect(() => {
        setVat(cart.length * 20)
        setDiscount(totprice * cart.length * 0.05)
        setCart_total(totprice + vat - discount)
    }, [totprice, cart.length, discount])
    // var cart_total = totprice + vat - discount
    const applyCoupon = () => {
        // toast.info(e)
        setActivecoupon(true)
        // if (cart_total > 100000) {

        //     if (coupon === 'lava') {
        //         setDiscount(discount + 5000)
        //         setCart_total(cart_total - 5000)
        //         toast.success('Correct Coupon Code. you will have more discount')

        //     }
        //     else {
        //         toast.error('Wrong Coupon Code Try Again !')
        //     }
        // }
        // else {
        if (coupon === 'lava') {
            setDiscount(discount + 50)
            setCart_total(cart_total - 50)
            toast.success('Correct Coupon Code. you will have more discount')

        }
        else {
            toast.error('Wrong Coupon Code Try Again !')
        }
        // }
    }
    const removeapplyCoupon = () => {
        setDiscount(discount - 50)
        setCart_total(cart_total + 50)
        toast.success('Remove Coupon Code. you will have less discount')
        setActivecoupon(false)
    }
    return (
        <>
            {cart.length > 0 && <HeroCard page={'Cart'} />}
            <section className={`shopping ${cart.length === 0 && "block"}`}>
                {cart.length > 0 ?
                    <>
                        <div className="shopping-cart ">
                            <table>
                                <thead>
                                    <tr>
                                        <th className='p-2'>IMAGE</th>
                                        <th className='p-2'>PRODUCT NAME</th>
                                        <th className='p-2'>PRICE</th>
                                        <th className='p-2'>QUANTITY</th>
                                        <th className='p-2'>SUB TOTAL</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cart.map((ele, index) => {
                                        return (
                                            <tr className='cart' key={index}>
                                                <td className="img w-25 me-4 p-2">
                                                    <img src={ele.ImageUrl} onClick={() => navigate(`/productdetails/${ele.id}/${ele.category}`)} className="w-100 h-50" alt="" />
                                                </td>
                                                <td className='p-2 '>
                                                    <p className='font-medium text-[#263787]'>{ele.title}</p>
                                                </td>
                                                <td className='p-2'>
                                                    <p className="">{ele.price} EGB</p>
                                                </td>
                                                <td className='p-2'>
                                                    <button className="increment" onClick={() => dispatch(addtocart(ele))}>+</button>
                                                    <span className="count">{ele.itemquantity}</span>
                                                    <button className="decrement" onClick={() => dispatch(decrease(ele))}>-</button>
                                                </td>
                                                <td className='p-2'>
                                                    <p className=""> {ele.price * ele.itemquantity} EGB</p>
                                                </td>
                                                <td className='p-2'>
                                                    <button className="delete text-2xl font-medium text-[#263787]" onClick={() => dispatch(removefromcart(ele))}> X</button>
                                                </td>
                                                {/* </td> */}
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                            {/* <button className='clear' onClick={() => dispatch(clearcart())}>Clear Cart</button>
                            <div className="price flex justify-between mt-3">
                                <span>Sub ({totquantity} items):</span>
                                <span > EGB {totprice}</span>
                            </div>
                            <hr />
                            <br />
                            <br /> */}
                        </div>
                        <div className="buy checkout" >
                            <div className='coupon'>
                                <input type="text" value={coupon} onChange={(e) => setCoupon(e.target.value)} placeholder='Your Coupon Code' />
                                {activecoupon
                                    ?
                                    <button className='apply' onClick={removeapplyCoupon}> Remove</button>
                                    :
                                    <button className='apply' onClick={applyCoupon}> Apply</button>
                                }
                            </div>
                            <div className="confirm cart-summary">
                                <h4 className="mb-30">Cart Summary</h4>
                                <ul>
                                    <li><strong>Sub Total:</strong> <span className='text-neutral-500'>{totprice} EGB</span></li>
                                    <li><strong>Vat:</strong> <span className='text-neutral-500'>{vat} EGB</span></li>
                                    <li><strong>Discount:</strong> <span className='text-neutral-500'>{discount} EGB</span></li>
                                    <li className="cart-total"><strong>Total Pay:</strong> <span className='text-[#2db7ff]'>{cart_total} EGB</span></li>
                                </ul>
                                <div className="text-end mt-6">
                                    <button className="theme-btn" onClick={() => { navigate(`/checkout/${discount}/${cart_total}/${vat}`) }}>Checkout Now <i className="far fa-arrow-right"></i></button>
                                </div>
                            </div>
                        </div>
                        {/* <Recommendation /> */}
                        {/* <Recommendation cart={cart} /> */}
                    </>
                    : <>
                        <div className="nocart bg-dark p-5 text-center ng-star-inserted">
                            <h1><PiHeartBreakFill className='text-warning text-center inline-block  text-[#2db7ff]' size={80} /></h1>
                            <h5 className="text-black">Shopping cart is empty !</h5>
                            <p className="text-black">push some products into your cart</p>
                            {/* <Button href="/home" id='home' >Back To Home</Button> */}
                            <Link to="/" >Back To Home</Link>

                        </div>
                    </>
                }
            </section>
            {
                cart.length > 0 &&
                <Recommendation />
            }


        </>
    )
}

export default Cart