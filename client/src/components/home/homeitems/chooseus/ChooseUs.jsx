import React from 'react'
import './ChooseUs.css'
const ChooseUs = () => {
    return (
        <section className="choose-us">
            <div className="container">
                <div className="grid lg:grid-cols-2">
                    <div className="choose-content">
                        <div className="site-heading ">
                            <span className="site-title-tagline text-white">Why Choose Us</span>
                            <h2 className="site-title text-white mb-10">We are dedicated <span>to provide</span> quality service</h2>
                            <p className="text-white">
                                It is a long established fact that a reader will be distracted by the readable
                                content of a page when looking at its layout.
                            </p>
                        </div>
                        <div className="choose-content-wrapper ">
                            <div className="choose-item">
                                <div className="choose-item-icon">
                                    <i className="icon-brush"></i>
                                </div>
                                <div className="choose-item-info">
                                    <h3>Natural Cleaners</h3>
                                    <p>There are many variations of passages of Lorem Ipsum available but the
                                        majority have suffered alteration.</p>
                                </div>
                            </div>
                            <div className="choose-item">
                                <div className="choose-item-icon">
                                    <i className="icon-seat"></i>
                                </div>
                                <div className="choose-item-info">
                                    <h3>Customer Focused</h3>
                                    <p>There are many variations of passages of Lorem Ipsum available but the
                                        majority have suffered alteration.</p>
                                </div>
                            </div>
                            <div className="choose-item">
                                <div className="choose-item-icon">
                                    <i className="icon-polish"></i>
                                </div>
                                <div className="choose-item-info">
                                    <h3>Interior Washing</h3>
                                    <p>There are many variations of passages of Lorem Ipsum available but the
                                        majority have suffered alteration.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="choose-img">
                        <div className="video-wrapper">
                            <a className="play-btn popup-youtube" href="https://www.youtube.com/watch?v=ckHzmP1evNU">
                                <i className="fas fa-play"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

        </section>
    )
}

export default ChooseUs