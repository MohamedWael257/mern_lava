import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from "react-router-dom";
import './Productdetails.css';
import { useSelector, useDispatch } from 'react-redux';
import { addtocart, cartitem, decrease } from "../../../redux/slice/cartslice"
import { FiHeart } from 'react-icons/fi';
// import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import { getProducts, productsdata } from '../../../redux/slice/productsslice';
import { AuthContext } from '../../../context/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaStar } from 'react-icons/fa';
function Productdetails() {
    const { id } = useParams();
    const product = useSelector(productsdata)
    const dispatch = useDispatch();
    const [favourit, setFavourit] = useState(false)
    const [rate, setRate] = useState(0)
    const cart = useSelector(cartitem)

    // const [like, setLike] = useState(false)
    // const [dislike, setDislike] = useState(false)
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
    // const add_like = async (ele) => {
    //     await axios.post(`${process.env.BASE_API_URL_HOST}/wishlist/add-wishlist`, { uid: currentUser?._id, product_ID: ele?.id })
    //         .then(res => {
    //             toast.success(res.data.message, {
    //                 position: "top-left",
    //             })
    //             setFavourit(true)
    //         })
    //         .catch(err => { toast.error(`${ele?.title} can't be added to Wishlist`) })

    // }
    // const remove_like = async (ele) => {
    //     await axios.post(`${process.env.BASE_API_URL_HOST}/wishlist/delete-wishlist`, { uid: currentUser?._id, product_ID: ele?.id })
    //         .then(res => {
    //             toast.success(res.data.message, {
    //                 position: "top-left",
    //             }); setFavourit(false)
    //         })
    //         .catch(err => { toast.error(`${ele?.title} can't be delete from Wishlist`) })
    // }
    const update_rate = async (rate, uid, product_ID, title) => {
        await axios.post(`${process.env.BASE_API_URL_HOST}/rate/update-rate`, { uid, product_ID, rate })
            .then(res => {
                toast.success(res.data.message, {
                    position: "top-left",
                });
                dispatch(getProducts())
            })
            .catch(err => { toast.error(`${title} can't be delete from Wishlist`) })

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
                        <p className="title"> {productdetails[0]?.title}</p>
                        <div className="rating">
                            {/* <div className="stars">
                                {stars} {"(" + product.raters + ")"}
                            </div> */}
                            <FaStar onClick={() => setRate(1)} color={`${rate >= 1 ? "#05bbfe" : "black"}`} className='inline-block ms-1' size={35} />
                            <FaStar onClick={() => setRate(2)} color={`${rate >= 2 ? "#05bbfe" : "black"}`} className='inline-block ms-1' size={35} />
                            <FaStar onClick={() => setRate(3)} color={`${rate >= 3 ? "#05bbfe" : "black"}`} className='inline-block ms-1' size={35} />
                            <FaStar onClick={() => setRate(4)} color={`${rate >= 4 ? "#05bbfe" : "black"}`} className='inline-block ms-1' size={35} />
                            <FaStar onClick={() => setRate(5)} color={`${rate >= 5 ? "#05bbfe" : "black"}`} className='inline-block ms-1' size={35} />
                            <span className='ml-3 views'>({productdetails[0]?.rating.N_of_Watches} Customer Reviews)</span>
                            <button onClick={() => update_rate(rate, currentUser?._id, productdetails[0]?.id, productdetails[0]?.title)} className='text-xl cursor-pointer font-medium text-[#263787] block ml-3 mt-2'> Confirm Rate</button>
                        </div>
                        <div className="price-count">
                            <span className="price"> {productdetails[0]?.category === "Cars" ? +productdetails[0]?.price + 25850 : +productdetails[0]?.price + 380} EGB</span>
                            <span className="price"> {productdetails[0]?.price} EGB</span>
                        </div>
                        <p className="description"> {productdetails[0]?.description}</p>
                        <div className="stock">
                            <p>Stock : </p>
                            <p
                                className={` ${productdetails[0]?.rating.rate_Count >= 5 ? "high" : "medium"
                                    } ${productdetails[0]?.rating.rate_Count <= 2 && "low"}`}
                            >
                                {productdetails[0]?.rating.rate_Count} In Stock
                            </p>
                        </div>
                        <div className="category">
                            <p>Brand : </p>
                            <p>{productdetails[0]?.brand}</p>
                        </div>
                        <div className="quantity">
                            <p>Quantity : </p>
                            {cart && cart.length > 0 ?
                                cart.map((ele) => {
                                    if (ele.id === productdetails[0]?.id)
                                        return (
                                            <>
                                                <button className="increment" onClick={() => dispatch(addtocart(ele))}></button>
                                                <span className="count grid place-content-center">{ele.itemquantity}</span>
                                                <button className="decrement" onClick={() => dispatch(decrease(ele))}></button>
                                            </>
                                        )
                                })
                                :
                                <>
                                    <button className="increment" onClick={() => dispatch(addtocart(productdetails[0]))}></button>
                                    <span className="count grid place-content-center">{productdetails[0]?.itemquantity}</span>
                                    <button className="decrement" onClick={() => dispatch(decrease(productdetails[0]))}></button>
                                </>
                            }
                            <button onClick={additem} className="addingbtn mr-5">Add to Cart</button>
                            {
                                favourit === true ?
                                    <button className='mr-20' onClick={() => delete_from_wishlist(productdetails[0])}><FiHeart className='p-2 rounded-lg text-red-600 border-[3px] border-red-600 hover:bg-red-600 hover:text-white' size={50} /></button>
                                    :
                                    <button className='mr-20' onClick={() => add_to_wishlist(productdetails[0])}><FiHeart className=' p-2 rounded-lg text-[#2DB7FF] border-[3px] border-[#2DB7FF] hover:bg-[#2DB7FF] hover:text-white' size={50} /></button>
                            }
                        </div>
                        <div className="category">
                            <p>Category : </p>
                            <p>{productdetails[0]?.category}</p>
                        </div>
                        <hr className='h-[3px] bg-[#2DB7FF]' />
                        <br />
                        <div className="category share">
                            <p>Share : </p>
                            <Link to="#"><i class="fab fa-facebook-f"></i></Link>
                            <Link to="#"><i class="fab fa-twitter"></i></Link>
                            <Link to="#"><i class="fab fa-instagram"></i></Link>
                            <Link to="#"><i class="fab fa-linkedin-in"></i></Link>
                            <Link to="#"><i class="fab fa-pinterest-p"></i></Link>
                        </div>
                        {/* <div className="flex"> */}
                        {/* <button className='mr-2' onClick={() => { like ? remove_like(productdetails[0]) : add_like(productdetails[0]) }}><AiOutlineLike size={50} color={`${like ? "red" : "grey"}`} /></button> */}
                        {/* <button className='mr-2' onClick={() => { dislike ? add_like(productdetails[0]) : remove_like(productdetails[0]) }}><AiOutlineDislike size={50} color={`${dislike ? "red" : "grey"}`} /></button> */}
                        {/* </div> */}
                    </div>
                </div>
            </div>

        </>
    )
}

export default Productdetails
