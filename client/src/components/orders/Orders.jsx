import React, { useContext, useEffect, useState } from 'react'
import "./Orders.css"
import { useSelector } from 'react-redux'
import axios from 'axios'
import { authuser } from '../../redux/slice/authslice'
import { AuthContext } from '../../context/AuthContext'
import { Link } from 'react-router-dom'
import { ordershistory } from '../../redux/slice/orderslice'
const Orders = () => {
    const getorders = useSelector(ordershistory)
    const { currentUser } = useContext(AuthContext)
    let orders = []
    for (const key in getorders) {
        if (getorders[key].uid === currentUser?._id) {
            orders.push(
                getorders[key].orderitem
            )
        }
    }
    let items = []
    for (const key of orders) {
        key.map(ele => items.push(ele))
    }
    return (
        <section className="orders">
            {orders ?
                <>
                    <h2>Hello {currentUser?.username}</h2>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>s/n</th>
                                <th>Product</th>
                                <th>Description</th>
                                <th>Price</th>
                                <th>Image</th>
                                <th>Quantity</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((ele, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{index}</td>
                                        <td>{ele.title}</td>
                                        <td>{ele.description}</td>
                                        <td>{+ele.price} EGB</td>
                                        <td><img className="tdimg" src={ele.ImageUrl} /></td>
                                        <td>{ele.itemquantity}</td>
                                        <td>{+ele.price * ele.itemquantity} EGB</td>
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
    )
}

export default Orders