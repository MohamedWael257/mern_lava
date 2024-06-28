import React from 'react'
import './Testimonials.css'
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import Image1 from '../../../../assets/Testi-Profile-4.png'
import Image2 from '../../../../assets/Testi-Profile-3.png'
import Image3 from '../../../../assets/Testi-Profile-2.png'
import Image4 from '../../../../assets/Test-iProfile-1.png'
import { FaStar } from "react-icons/fa";
import { useLocation } from 'react-router-dom';
import HeroCard from '../../../ui/herocard/HeroCard'
import Work from '../work/Work';
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
    const { pathname } = useLocation();

    return (
        <>
            {/* {pathname == '/testimonials' &&
                <>
                    <HeroCard page={'Testimonials'} />
                    <Work />
                </>
            } */}
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
                {/* <div className="cards">
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
                </div> */}
                {/* </div> */}
            </section>
        </>
    )
}

export default Testimonials