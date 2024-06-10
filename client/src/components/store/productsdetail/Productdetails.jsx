import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from "react-router-dom";
import './Productdetails.css';
import { useSelector, useDispatch } from 'react-redux';
import { addtocart } from "../../../redux/slice/cartslice"
import { FiHeart } from 'react-icons/fi';
import { productsdata } from '../../../redux/slice/productsslice';
import { AuthContext } from '../../../context/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';
function Productdetails() {
    const { id } = useParams();
    const product = useSelector(productsdata)
    const dispatch = useDispatch();
    const [favourit, setFavourit] = useState(false)
    const productdetails = product.filter((pro) => pro.id === id);
    const additem = () => {
        dispatch(addtocart(productdetails[0]))
    }
    const { currentUser } = useContext(AuthContext)
    const [wishlist, setWishlist] = useState([])
    useEffect(() => {
        axios.post(`${process.env.BASE_API_URL_HOST}/wishlist/wishlistData`, { uid: currentUser?._id })
            .then(res => setWishlist(res.data.Data))
            .catch(err => toast.error(err.message))

    }, [currentUser?._id, wishlist]);
    const add_to_wishlist = async (ele) => {
        await axios.post(`${process.env.BASE_API_URL_HOST}/wishlist/add-wishlist`, { uid: currentUser?._id, product_ID: ele?.id })
            .then(res => {
                toast.success(res.data.message, {
                    position: "top-left",
                })
                setFavourit(true)
            })
            .catch(err => { toast.error(`${ele?.title} can't be added to Wishlist`) })

    }
    const delete_from_wishlist = async (ele) => {
        await axios.post(`${process.env.BASE_API_URL_HOST}/wishlist/delete-wishlist`, { uid: currentUser?._id, product_ID: ele?.id })
            .then(res => {
                toast.success(res.data.message, {
                    position: "top-left",
                }); setFavourit(false)
            })
            .catch(err => { toast.error(`${ele?.title} can't be delete from Wishlist`) })
    }
    return (
        <>
            <div className="product-details">
                <div className="head">
                    <h2><b>Product Details</b></h2>
                    <Link to="/store">&larr; Back To Store</Link>
                </div>
                <div className="content">
                    <div className="image">
                        <img src={productdetails[0]?.ImageUrl} alt="detail" />
                    </div>
                    <div className="text">
                        <p className="title">Products : {productdetails[0]?.title}</p>
                        <p className="title">Description :  {productdetails[0]?.description}</p>
                        <p className="title">Brand :  {productdetails[0]?.brand}</p>
                        <p className="title">Category :  {productdetails[0]?.category}</p>
                        {/* <div className="rating">
                            <div className="stars">
                                {stars} {"(" + product.raters + ")"}
                            </div>
                        </div> */}
                        <div className="price-count">
                            <p className="price text-black">Price : {productdetails[0]?.price} EGB</p>
                            {/* <p
                                className={`count ${productdetails[0]?.rating.count >= 5 ? "high" : "medium"
                                    } ${productdetails[0]?.rating.count <= 2 && "low"}`}
                            >
                                {productdetails[0]?.rating.count} In Stock
                            </p> */}
                        </div>
                        {/* <h5 className="category">Category : {productdetails[0]?.category}</h5> */}
                        {/* <h5 className="brand">Brand : {productdetails[0]?.brand}</h5> */}
                        <div className="flex">

                            <button onClick={additem} className="addingbtn mr-5">Add to Cart</button>
                            {
                                favourit === true ?
                                    <button onClick={() => delete_from_wishlist(productdetails[0])}><FiHeart size={50} color='red ' /></button>
                                    :
                                    <button onClick={() => add_to_wishlist(productdetails[0])}><FiHeart size={50} /></button>
                            }
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Productdetails
