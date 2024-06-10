import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './Footer.css'
import Logo from "../../assets/img/logo/logo-light.png"
import { AuthContext } from '../../context/AuthContext'

const Footer = () => {
    const { currentUser } = useContext(AuthContext)
    // const [activeside, setActiveside] = useState(true)
    // useEffect(() => {
    //     if (location.pathname === "/profile/chat") {
    //         setActiveside(false)
    //         // console.log('true');
    //     }
    // }, [location.pathname])
    return (
        <>
            {currentUser &&
                <footer className="footer-area">
                    <div className="footer-widget">
                        <div className='container'>
                            <div className="grid md:grid-cols-2 lg:grid-cols-4 footer-widget-wrapper">
                                <div className="footer-widget-box about-us ">
                                    <a href="#" className="footer-logo">
                                        <img src={Logo} alt="" />
                                    </a>
                                    <p className="mb-3">
                                        We are many variations of passages available but the majority have suffered alteration
                                        in some form by injected humour words believable.
                                    </p>
                                    <ul className="footer-contact">
                                        <li><a href="tel:+21236547898"><i className="far fa-phone"></i>+2 123 654 7898</a></li>
                                        <li><i className="far fa-map-marker-alt"></i>25/B Milford Road, New York</li>
                                        <li><a href="mailto:info@example.com"><i className="far fa-envelope"></i>info@example.com</a></li>
                                    </ul>
                                </div>
                                <div className="footer-widget-box list ">
                                    <h4 className="footer-widget-title">Quick Links</h4>
                                    <ul className="footer-list">
                                        <li><a href="#"><i className="fas fa-caret-right"></i> About Us</a></li>
                                        <li><a href="#"><i className="fas fa-caret-right"></i> FAQ's</a></li>
                                        <li><a href="#"><i className="fas fa-caret-right"></i> Terms Of Service</a></li>
                                        <li><a href="#"><i className="fas fa-caret-right"></i> Privacy policy</a></li>
                                        <li><a href="#"><i className="fas fa-caret-right"></i> Our Team</a></li>
                                        <li><a href="#"><i className="fas fa-caret-right"></i> Latest Blog</a></li>
                                    </ul>
                                </div>
                                <div className="footer-widget-box list">
                                    <h4 className="footer-widget-title">Our Services</h4>
                                    <ul className="footer-list">
                                        <li><a href="#"><i className="fas fa-caret-right"></i> Auto Detailing</a></li>
                                        <li><a href="#"><i className="fas fa-caret-right"></i> Full Tire Wash</a></li>
                                        <li><a href="#"><i className="fas fa-caret-right"></i> Full Car Wash</a></li>
                                        <li><a href="#"><i className="fas fa-caret-right"></i> Express Exterior</a></li>
                                        <li><a href="#"><i className="fas fa-caret-right"></i> Interior Polish</a></li>
                                        <li><a href="#"><i className="fas fa-caret-right"></i> Engine Wash</a></li>
                                    </ul>
                                </div>
                                <div className="footer-widget-box list ">
                                    <h4 className="footer-widget-title">Newsletter</h4>
                                    <div className="footer-newsletter">
                                        <p>Subscribe Our Newsletter To Get Latest Update And News</p>
                                        <div className="subscribe-form">
                                            <form action="#">
                                                <input type="email" className="form-control" placeholder="Your Email" />
                                                <button className="theme-btn" type="submit">
                                                    Subscribe Now <i className="far fa-paper-plane"></i>
                                                </button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="copyright">
                        <div className="containe">
                            <div className="mx-auto flex flex-wrap justify-between">
                                <div className="md:w-[50%] self-center">
                                    <p className="copyright-text">
                                        © Copyright <span id="date">2024</span> <a href="#"> Carwash </a> All Rights Reserved.
                                    </p>
                                </div>
                                <div className="md:w-[50%] self-center">
                                    <ul className="footer-social">
                                        <li><a href="#"><i className="fab fa-facebook-f"></i></a></li>
                                        <li><a href="#"><i className="fab fa-twitter"></i></a></li>
                                        <li><a href="#"><i className="fab fa-linkedin-in"></i></a></li>
                                        <li><a href="#"><i className="fab fa-youtube"></i></a></li>
                                    </ul>
                                </div>
                            </div>

                        </div>
                    </div >
                </footer >
            }
        </>

    )
}

export default Footer