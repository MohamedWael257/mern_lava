import React from 'react'
import './Testimonials.css'
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import Image1 from '../../assets/Testi-Profile-4.png'
import Image2 from '../../assets/img/partiner/01.png'
import Image3 from '../../assets/img/partiner/02.png'
import { FaStar } from "react-icons/fa";
import { useLocation } from 'react-router-dom';
import HeroCard from '../ui/herocard/HeroCard';
import Work from '../home/homeitems/work/Work';
const Testimonials = () => {
    const options = {
        items: 3, // Number of items to display
        margin: 10, // Margin between items
        responsive: {
            0: {
                items: 1 // Number of items to display on small screens
            },
            768: {
                items: 3 // Number of items to display on medium screens
            },
            1024: {
                items: 4 // Number of items to display on large screens
            }
        }
    };
    const partiner = {
        items: 6, // Number of items to display
        margin: 10, // Margin between items
        responsive: {
            0: {
                items: 3 // Number of items to display on small screens
            },
            768: {
                items: 4 // Number of items to display on medium screens
            },
            1024: {
                items: 6 // Number of items to display on large screens
            }
        }
    };
    const { pathname } = useLocation();
    return (
        <>
            <HeroCard page={'Testimonials'} />
            <Work />
            <section className="testimonials">
                {/* <div className="overlay"> */}
                <h3>testimonials</h3>
                <h2>What Client <span>Say's</span></h2>
                <OwlCarousel className='cardss owl-theme' loop autoplay margin={20} responsive={options.responsive} items={4} >
                    <div className="card">
                        <div className="card-left">
                            <img className="card-img" src={Image1} alt="" />
                            <h3 className="card-name">mohamed</h3>
                            <p>customer</p>
                        </div>
                        <div className="card-right">
                            <p className="card-desc">
                                There are many variations of passages available but the majority have
                                suffered to the alteration in some injected.
                            </p>
                            <div className='stars'>
                                <FaStar />
                                <FaStar />
                                <FaStar />
                                <FaStar />
                                <FaStar />
                            </div>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-left">
                            <img className="card-img" src={Image1} alt="" />
                            <h3 className="card-name">mohamed</h3>
                            <p>customer</p>
                        </div>
                        <div className="card-right">
                            <p className="card-desc">
                                There are many variations of passages available but the majority have
                                suffered to the alteration in some injected.
                            </p>
                            <div className='stars'>
                                <FaStar />
                                <FaStar />
                                <FaStar />
                                <FaStar />
                                <FaStar />
                            </div>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-left">
                            <img className="card-img" src={Image1} alt="" />
                            <h3 className="card-name">mohamed</h3>
                            <p>customer</p>
                        </div>
                        <div className="card-right">
                            <p className="card-desc">
                                There are many variations of passages available but the majority have
                                suffered to the alteration in some injected.
                            </p>
                            <div className='stars'>
                                <FaStar />
                                <FaStar />
                                <FaStar />
                                <FaStar />
                                <FaStar />
                            </div>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-left">
                            <img className="card-img" src={Image1} alt="" />
                            <h3 className="card-name">mohamed</h3>
                            <p>customer</p>
                        </div>
                        <div className="card-right">
                            <p className="card-desc">
                                There are many variations of passages available but the majority have
                                suffered to the alteration in some injected.
                            </p>
                            <div className='stars'>
                                <FaStar />
                                <FaStar />
                                <FaStar />
                                <FaStar />
                                <FaStar />
                            </div>
                        </div>
                    </div>
                </OwlCarousel>

            </section>
            <section className='partiner bg-[#edf5f9] pt-12 pb-12'>
                <div className="conta w-[85%] my-0 mx-auto">
                    <OwlCarousel className='owl-theme' loop autoplay margin={partiner.margin} responsive={partiner.responsive} items={4} >
                        <img className='w-[193.5px]' src={Image2} alt="img" />
                        <img className='w-[193.5px]' src={Image3} alt="img" />
                        <img className='w-[193.5px]' src={Image2} alt="img" />
                        <img className='w-[193.5px]' src={Image3} alt="img" />
                        <img className='w-[193.5px]' src={Image2} alt="img" />
                        <img className='w-[193.5px]' src={Image3} alt="img" />

                    </OwlCarousel>
                </div>
            </section>
        </>
    )
}

export default Testimonials