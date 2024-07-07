import React, { useContext, useEffect, useState } from 'react'
import "./Wishlists.css"
import { AuthContext } from '../../context/AuthContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { FiHeart, FiSearch, FiShoppingCart } from 'react-icons/fi'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { getProducts } from '../../redux/slice/productsslice'
import { PiHeartBreakFill } from "react-icons/pi"
const Wishlists = () => {
    const { currentUser } = useContext(AuthContext)
    const [wishlist, setWishlist] = useState([])
    useEffect(() => {
        axios.post(`${process.env.BASE_API_URL_HOST}/wishlist/wishlistData`, { uid: currentUser?._id })
            .then(res => setWishlist(res.data.Data))
            .catch(err => toast.error(err.message))

    }, [currentUser?._id, wishlist]);
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const add_to_wishlist = async (ele) => {
        await axios.post(`${process.env.BASE_API_URL_HOST}/wishlist/add-wishlist`, { uid: currentUser?._id, product_ID: ele._id })
            .then(res => toast.success(res.data.message, {
                position: "top-left",
            }))
            .catch(err => { toast.error(`${ele.title} can't be added to Wishlist`) })
        dispatch(getProducts())
    }
    const delete_from_wishlist = async (ele) => {
        await axios.post(`${process.env.BASE_API_URL_HOST}/wishlist/delete-wishlist`, { uid: currentUser?._id, product_ID: ele._id })
            .then(res => toast.success(res.data.message, {
                position: "top-left",
            }))
            .catch(err => { toast.error(`${ele.title} can't be delete from Wishlist`) })
        dispatch(getProducts())

    }
    return (
        <>
            {
                wishlist.length === 0 ?
                    <div className="nocart bg-dark p-5 text-center ng-star-inserted">
                        <h1><PiHeartBreakFill className='text-warning text-center inline-block  text-[#2db7ff]' size={80} /></h1>
                        <h5 className="text-black">Wishlist  is empty !</h5>
                        <p className="text-black">push some products into your Wishlist</p>
                        {/* <Button href="/home" id='home' >Back To Home</Button> */}
                        <Link to="/store" >Back To Home</Link>
                    </div>
                    :
                    <div className="wishlists products">
                        {
                            wishlist.map((ele, index) => {
                                return (
                                    <div className="product-card" key={index}>
                                        <img src={ele.ImageUrl} className="card-img" alt="" />
                                        <h2 className="card-title">{ele.title}</h2>
                                        {/* <p className="card-desc">{ele.description}</p> */}
                                        <p className="card-price">{+ele.price * ele.itemquantity} EGB</p>
                                        <div className="add-to-cart" >
                                            <i onClick={() => dispatch(addtocart(ele))}><FiShoppingCart /></i>
                                            {/* <i onClick={() => dispatch(addtofavourit(ele))}><FiHeart /></i> */}
                                            {
                                                ele.favourit === true ?
                                                    <i onClick={() => delete_from_wishlist(ele)}><FiHeart color='red ' /></i>
                                                    :
                                                    <i onClick={() => add_to_wishlist(ele)}><FiHeart /></i>

                                            }
                                            <i onClick={() => navigate(`/productdetails/${ele.id}/${category}`)}><FiSearch /></i>

                                        </div>
                                    </div>)
                            })
                        }
                    </div>
            }
        </>
    )
}

export default Wishlists