import React, { memo } from 'react'
import './Cta.css'
const Cta = memo(() => {
    return (
        <>
            <div className="cta-area pb-80">
                <div className="container">
                    <div className="cta-wrapper">
                        <div className="row align-items-center">
                            <div className="col-lg-7 text-center text-lg-start">
                                <div className="cta-text cta-divider">
                                    <h1>Get Your Car Washed It's Simple And Affordable</h1>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet leo tris
                                        commodo
                                        leo sed, scelerisque turpis. Ut in finibus tellus. </p>
                                </div>
                            </div>
                            <div className="col-lg-5 text-center text-lg-end">
                                <div className="mb-20">
                                    <a href="#" className="cta-number"><i className="fas fa-headphones"></i>+2 123 654 7898</a>
                                </div>
                                <div className="cta-btn">
                                    <a href="#" className="theme-btn">Order Now <i className="far fa-arrow-right"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
})

export default Cta