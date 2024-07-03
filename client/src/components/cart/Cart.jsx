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

    return (
        <>
            {cart.length > 0 && <HeroCard page={'Cart'} />}
            <section className={`shopping ${cart.length === 0 && "block"}`}>
                {cart.length > 0 ?
                    <>
                        <div className="shopping-cart ">
                            <div className="head">
                                <span>shopping Cart</span>
                                <span>price</span>
                            </div>
                            <hr />
                            {cart.map((ele, index) => {
                                return (
                                    <Fragment key={index}>
                                        <div className="cart">
                                            <div className="img w-25 me-4">
                                                <img src={ele.ImageUrl} onClick={() => navigate(`/productdetails/${ele.id}/${ele.category}`)} className="w-100 h-50" alt="" />
                                            </div>
                                            <div className="card-details">
                                                <div className="title">
                                                    <p>{ele.description}</p>
                                                    <strong className="">EGB {ele.price * ele.itemquantity}</strong>
                                                </div>
                                                <p>{ele.title}</p>
                                                <button className="increment" onClick={() => dispatch(addtocart(ele))}>+</button>
                                                <span className="count">{ele.itemquantity}</span>
                                                <button className="decrement" onClick={() => dispatch(decrease(ele))}>-</button>
                                                <button className="delete" onClick={() => dispatch(removefromcart(ele))}> delete</button>

                                            </div>
                                            <hr />
                                            <br />
                                            <br />
                                        </div>
                                    </Fragment>
                                )
                            })}
                            {/* <button className='clear' onClick={() => {
                                localStorage.removeItem('cart'); toast.info(`Cart cleared`, {
                                    position: "top-left",
                                });
                            }}>Clear Cart</button> */}
                            <button className='clear' onClick={() => dispatch(clearcart())}>Clear Cart</button>
                            <div className="price flex justify-between mt-3">
                                <span>Sub ({totquantity} items):</span>
                                <span > EGB {totprice}</span>
                            </div>
                            <hr />
                            <br />
                            <br />
                        </div>
                        <div className="buy" >
                            <div className="detail ">
                                <i><FaCheck /></i>
                                <div>
                                    <p>Your first order qualifies for FREE Delivery.
                                        Select this option at checkout.<Link to="/">Details</Link></p>
                                    <div>
                                        <div className="price">
                                            <span>Sub({totquantity} items):</span>
                                            <span> EGB {totprice}</span>
                                        </div>
                                        <button className='process-to-buy' onClick={() => { navigate('/checkout') }}>Checkout Now</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <Recommendation /> */}
                        {/* <Recommendation cart={cart} /> */}
                    </>
                    : <>
                        <div className="nocart bg-dark p-5 text-center ng-star-inserted">
                            <h1><PiHeartBreakFill className='text-warning text-center inline-block  text-[#477cff]' size={80} /></h1>
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