import React, { useState, useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ordershistory } from '../../../../redux/slice/orderslice';
import axios from 'axios';
import { AuthContext } from '../../../../context/AuthContext'
import { FiHeart, FiSearch, FiShoppingCart } from 'react-icons/fi';
import { addtocart } from '../../../../redux/slice/cartslice';
import { getProducts, productsdata } from '../../../../redux/slice/productsslice';
import { toast } from 'react-toastify';
const Recommendation = () => {
    const dispatch = useDispatch()
    const [products, setProducts] = useState([]);
    const productsDB = useSelector(productsdata)
    const getorders = useSelector(ordershistory)
    const { currentUser } = useContext(AuthContext)
    let orders = []
    for (const key in getorders) {
        if (getorders[key].uid === currentUser?._id) {
            orders.push(getorders[key].orderitem)
        }
    }
    let items = []
    for (const key of orders) {
        key.map(ele => items.push(ele))
    }
    const [array, setArray] = useState([])
    useEffect(() => {
        let arr = []
        items.map(ele => {
            arr.push(ele.title)
            setArray(arr)
        })
    }, [])
    const [removeDuplicatesArray, setRemoveDuplicatesArray] = useState([])
    useEffect(() => {
        const uniqueData = [...new Set(array)];
        setRemoveDuplicatesArray(uniqueData);
    }, [])
    useEffect(() => {
        let arr = []
        for (const key of removeDuplicatesArray) {
            productsDB.filter(ele => {
                if (ele.title == key) {
                    arr.push(ele);
                    setProducts(arr)
                    // console.log(ele);
                }
            })

        }
    }, [])
    // const countDuplicates = (arr) => {
    //     const frequencyMap = {};
    //     arr.forEach((item) => {
    //         // const key = JSON.stringify(item);
    //         frequencyMap[item] = (frequencyMap[item] || 0) + 1;
    //         // frequencyMap[key] = (frequencyMap[key] || 0) + 1;
    //     });
    //     const maxFrequency = Math.max(...Object.values(frequencyMap));
    //     const duplicates = Object.keys(frequencyMap).filter((key) => frequencyMap[key] === maxFrequency);
    //     return { maxFrequency, duplicates };
    // };

    // const { maxFrequency, duplicates } = countDuplicates(array);
    // useEffect(() => {
    //     let arr = []
    //     Cars.filter(ele => {
    //         if (ele.title == duplicates) {
    //             arr.push(ele);
    //             setProducts(arr)
    //         }
    //     })
    // }, [])
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
    return (
        <>
            <div className='recommendation storingg'>
                {/* <h1>Max Number of Duplicates: {maxFrequency}</h1> */}
                <div className='products'>
                    {/* <h2>Duplicated Data:</h2> */}
                    {products && products.map((ele, index) => (
                        <div className="product-card" key={index}>
                            <img src={ele.ImageUrl} className="card-img" alt="" />
                            <h2 className="card-title">{ele.title}</h2>
                            {/* <p className="card-desc">{ele.description}</p> */}
                            <p className="card-price">{+ele.price * ele.itemquantity} EGB</p>
                            <div className="add-to-cart">
                                <i onClick={() => dispatch(addtocart(ele))}><FiShoppingCart /></i>
                                {
                                    ele.favourit === true ?
                                        <i onClick={() => delete_from_wishlist(ele)}><FiHeart color='red ' /></i>
                                        :
                                        <i onClick={() => add_to_wishlist(ele)}><FiHeart /></i>
                                }
                                <i onClick={() => navigate(`/productdetails/${ele.id}/${category}`)}><FiSearch /></i>

                            </div>
                        </div>))
                    }

                </div>
            </div>
        </>
    )
}

export default Recommendation