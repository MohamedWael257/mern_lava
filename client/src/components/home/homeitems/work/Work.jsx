import React, { memo } from 'react'
import './Work.css'
const Work = memo(() => {
    return (
        <>
            <section className="process-area bg py-120">
                <div className="container">
                    <div className="row">
                        <div>
                            <div className="site-heading">
                                <span className="site-title-tagline">Process</span>
                                <h2 className="site-title">How It's <span>Work</span></h2>
                            </div>
                        </div>
                    </div>
                    <div className="cards row">
                        <div className="card">
                            <div className="process-single">
                                <div className="icon">
                                    <span>01</span>
                                    <i className="icon-car-service-1"></i>
                                </div>
                                <h4>Make An Appointment</h4>
                                <p>It is a long established fact that a reader will be distracted readable content of
                                    a page. </p>
                            </div>
                        </div>
                        <div className="card">
                            <div className="process-single">
                                <div className="icon">
                                    <span>02</span>
                                    <i className="icon-car-wash"></i>
                                </div>
                                <h4>Get Awesome Services</h4>
                                <p>It is a long established fact that a reader will be distracted readable content of
                                    a page. </p>
                            </div>
                        </div>
                        <div className="card">
                            <div className="process-single">
                                <div className="icon">
                                    <span>03</span>
                                    <i className="icon-car"></i>
                                </div>
                                <h4>Pay Online &amp; Get Your Car</h4>
                                <p>It is a long established fact that a reader will be distracted readable content of
                                    a page. </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
})

export default Work