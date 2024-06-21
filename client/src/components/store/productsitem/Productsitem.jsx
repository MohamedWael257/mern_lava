import React, { useContext, useEffect, useState } from 'react'
import "../Store.css"
import { useNavigate } from 'react-router-dom';
import { FiShoppingCart, FiHeart, FiSearch } from "react-icons/fi"
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { addtocart } from '../../../redux/slice/cartslice';
import axios from 'axios';
import { getProducts } from '../../../redux/slice/productsslice';
import { AuthContext } from "../../../context/AuthContext"
function Productsitem({ product, category }) {
    const { currentUser } = useContext(AuthContext)
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const add_to_wishlist = async (ele) => {
        await axios.post(`${process.env.BASE_API_URL_HOST}/wishlist/add-wishlist`, { uid: currentUser?._id, product_ID: ele.id })
            .then(res => toast.success(res.data.message, {
                position: "top-left",
            }))
            .catch(err => { toast.error(`${ele.title} can't be added to Wishlist`) })
        dispatch(getProducts())
    }
    const delete_from_wishlist = async (ele) => {
        await axios.post(`${process.env.BASE_API_URL_HOST}/wishlist/delete-wishlist`, { uid: currentUser?._id, product_ID: ele.id })
            .then(res => toast.success(res.data.message, {
                position: "top-left",
            }))
            .catch(err => { toast.error(`${ele.title} can't be delete from Wishlist`) })
        dispatch(getProducts())
    }
    const productData = async (ele) => {
        const product_ID = ele.id
        await axios.post(`${process.env.BASE_API_URL_HOST}/products/get-product/${product_ID}`, { uid: currentUser?._id })
            .then(res => toast.success("sucess"))
            .catch(err => toast.error(err.message))
        navigate(`/productdetails/${ele.id}/${category}`)
    }
    return (
        <>
            <div className='products'>
                {
                    product.map((ele, index) => {
                        return (
                            <div className="product-card" key={index}>
                                <img src={ele.ImageUrl} className="card-img" alt="" />
                                <h2 className="card-title">{ele.title}</h2>
                                {/* <p className="card-desc">{ele.description}</p> */}
                                <p className="card-price">{+ele.price * ele.itemquantity} EGB</p>
                                <div className="add-to-cart" >
                                    <i onClick={() => dispatch(addtocart(ele))}><FiShoppingCart /></i>
                                    {
                                        ele.favourit === true ?
                                            <i onClick={() => delete_from_wishlist(ele)}><FiHeart color='red ' /></i>
                                            :
                                            <i onClick={() => add_to_wishlist(ele)}><FiHeart /></i>
                                    }
                                    <i onClick={() => productData(ele)}><FiSearch /></i>

                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}

export default Productsitem