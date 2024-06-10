import React from 'react'
import { FiHeart, FiSearch, FiShoppingCart } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import './Bestseller.css'
import Image1 from '../../../../assets/img/bestseller/01.png'
import Image2 from '../../../../assets/img/bestseller/02.png'
import Image3 from '../../../../assets/img/bestseller/03.png'
import { FaStar } from 'react-icons/fa'

const Bestseller = () => {
    const navigate = useNavigate()
    return (
        <>
            <section className="best-seller ">
                <h3>best seller</h3>
                <div className=" products">
                    <div className=" product-card" >
                        <img src={Image1} className="card-img" alt="" />
                        <h2 className="card-title">Wheel Cover</h2>
                        <div className=" inline-block mr-5 mb-2">
                            <FaStar color='#05bbfe' className='inline-block ms-1' size={20} />
                            <FaStar color='#05bbfe' className='inline-block ms-1' size={20} />
                            <FaStar color='#05bbfe' className='inline-block ms-1' size={20} />
                            <FaStar color='#05bbfe' className='inline-block ms-1' size={20} />
                            <FaStar color='#05bbfe' className='inline-block ms-1' size={20} />
                        </div>
                        <span className="card-price">1200 EGB</span>
                        <div className="add-to-cart">
                            <i onClick={() => navigate('/store')}><FiShoppingCart /></i>
                            <i onClick={() => navigate('/store')}><FiHeart /></i>
                            <i onClick={() => navigate('/store')}><FiSearch /></i>
                        </div>
                    </div>
                    <div className=" product-card" >
                        <img src={Image2} className="card-img" alt="" />
                        <h2 className="card-title">Car Couch</h2>
                        <div className=" inline-block mr-5 mb-2">
                            <FaStar color='#05bbfe' className='inline-block ms-1' size={20} />
                            <FaStar color='#05bbfe' className='inline-block ms-1' size={20} />
                            <FaStar color='#05bbfe' className='inline-block ms-1' size={20} />
                            <FaStar color='#05bbfe' className='inline-block ms-1' size={20} />
                            <FaStar color='#05bbfe' className='inline-block ms-1' size={20} />
                        </div>
                        <span className="card-price">2500 EGB</span>
                        <div className="add-to-cart">
                            <i onClick={() => navigate('/store')}><FiShoppingCart /></i>
                            <i onClick={() => navigate('/store')}><FiHeart /></i>
                            <i onClick={() => navigate('/store')}><FiSearch /></i>
                        </div>
                    </div>
                    <div className=" product-card" >
                        <img src={Image3} className="card-img" alt="" />
                        <h2 className="card-title">Cleaner</h2>
                        <div className=" inline-block mr-5 mb-2">
                            <FaStar color='#05bbfe' className='inline-block ms-1' size={20} />
                            <FaStar color='#05bbfe' className='inline-block ms-1' size={20} />
                            <FaStar color='#05bbfe' className='inline-block ms-1' size={20} />
                            <FaStar color='#05bbfe' className='inline-block ms-1' size={20} />
                            <FaStar color='#05bbfe' className='inline-block ms-1' size={20} />
                        </div>
                        <span className="card-price">260 EGB</span>
                        <div className="add-to-cart">
                            <i onClick={() => navigate('/store')}><FiShoppingCart /></i>
                            <i onClick={() => navigate('/store')}><FiHeart /></i>
                            <i onClick={() => navigate('/store')}><FiSearch /></i>
                        </div>
                    </div>
                    <div className=" product-card" >
                        <img src='https://th.bing.com/th/id/R.1702fae90c84c68385c32931c7fad964?rik=YzIYp3%2BgrWX%2BTw&pid=ImgRaw&r=0' className="card-img" alt="" />
                        <h2 className="card-title">BMW 5 Series</h2>
                        <div className=" inline-block mr-5 mb-2">
                            <FaStar color='#05bbfe' className='inline-block ms-1' size={20} />
                            <FaStar color='#05bbfe' className='inline-block ms-1' size={20} />
                            <FaStar color='#05bbfe' className='inline-block ms-1' size={20} />
                            <FaStar color='#05bbfe' className='inline-block ms-1' size={20} />
                            <FaStar color='#05bbfe' className='inline-block ms-1' size={20} />
                        </div>
                        <span className="card-price">30000 EGB</span>
                        <div className="add-to-cart">
                            <i onClick={() => navigate('/store')}><FiShoppingCart /></i>
                            <i onClick={() => navigate('/store')}><FiHeart /></i>
                            <i onClick={() => navigate('/store')}><FiSearch /></i>
                        </div>
                    </div>
                    <div className=" product-card" >
                        <img src='https://th.bing.com/th/id/R.553d6db58213472abf172ede45c70a79?rik=5OsQ5KRClF6mhA&pid=ImgRaw&r=0' className="card-img" alt="" />
                        <h2 className="card-title">Renault Megane</h2>
                        <div className=" inline-block mr-5 mb-2">
                            <FaStar color='#05bbfe' className='inline-block ms-1' size={20} />
                            <FaStar color='#05bbfe' className='inline-block ms-1' size={20} />
                            <FaStar color='#05bbfe' className='inline-block ms-1' size={20} />
                            <FaStar color='#05bbfe' className='inline-block ms-1' size={20} />
                            <FaStar color='#05bbfe' className='inline-block ms-1' size={20} />
                        </div>
                        <span className="card-price">290000 EGB</span>
                        <div className="add-to-cart">
                            <i onClick={() => navigate('/store')}><FiShoppingCart /></i>
                            <i onClick={() => navigate('/store')}><FiHeart /></i>
                            <i onClick={() => navigate('/store')}><FiSearch /></i>
                        </div>
                    </div>
                    <div className=" product-card" >
                        <img src='https://arabgt.com/wp-content/uploads/2022/06/%D9%83%D9%88%D8%B1%D9%81%D8%AA-2023.jpg' className="card-img" alt="" />
                        <h2 className="card-title">Chevrolet Corvette</h2>
                        <div className=" inline-block mr-5 mb-2">
                            <FaStar color='#05bbfe' className='inline-block ms-1' size={20} />
                            <FaStar color='#05bbfe' className='inline-block ms-1' size={20} />
                            <FaStar color='#05bbfe' className='inline-block ms-1' size={20} />
                            <FaStar color='#05bbfe' className='inline-block ms-1' size={20} />
                            <FaStar color='#05bbfe' className='inline-block ms-1' size={20} />
                        </div>
                        <span className="card-price">1350000 EGB</span>
                        <div className="add-to-cart">
                            <i onClick={() => navigate('/store')}><FiShoppingCart /></i>
                            <i onClick={() => navigate('/store')}><FiHeart /></i>
                            <i onClick={() => navigate('/store')}><FiSearch /></i>
                        </div>
                    </div>
                </div>
                <button onClick={() => navigate('/store')}>see all</button>
            </section>
        </>
    )
}

export default Bestseller