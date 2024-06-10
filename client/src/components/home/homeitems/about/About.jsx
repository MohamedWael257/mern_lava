import React, { useEffect, useRef, useState } from 'react'
import './About.css'
import Foto1 from '../../../../assets/About-Us-foto-.png'
import Foto2 from '../../../../assets/img/shape/02.png'
import Foto3 from '../../../../assets/about-us-Foto-3.png.png'

import Foto4 from '../../../../assets/About-us-image.png'
import Foto5 from '../../../../assets/About-us-image2.png'
import Foto6 from '../../../../assets/About-us-image3.png'

const About = () => {
    const aboutref = useRef()
    const [active, setActive] = useState(false)
    // window.onscroll = () => {
    //     let aboutcontaintop = aboutref.current.offsetTop;
    //     let aboutheight = aboutref.current.offsetHeight;
    //     let screenheight = window.innerHeight;
    //     let scrollaction = window.pageYOffset;
    //     if (scrollaction > (aboutcontaintop + (0.5 * aboutheight) - screenheight)) {
    //         setActive(true)
    //     } else {
    //         setActive(false)

    //     }
    // }
    return (
        <>
            <section className="aboutref p-6" ref={aboutref}>
                <div className="container min-h-64">
                    <div className="cards text-center grid md:grid-cols-2 lg:grid-cols-4">
                        <div className="card">
                            <i class="feature-icon icon-car-wash text-7xl mb-4 mx-auto inline-block"></i>
                            <div class="feature-shadow-icon">
                                <i class="icon-car-wash "></i>
                            </div>
                            <h2 className="card-title">Quality Service</h2>
                            <p className="card-desc">Contrary to popular belief psum is top simply random.</p>
                        </div>
                        <div className="card">
                            <i class="feature-icon icon-car-service-1 text-7xl mb-4 mx-auto inline-block"></i>
                            <div class="feature-shadow-icon">
                                <i class="icon-car-service-1"></i>
                            </div>
                            <h2 className="card-title">Online Booking </h2>
                            <p className="card-desc">Contrary to popular belief psum is top simply random.</p>
                        </div>
                        <div className="card">
                            <i class="feature-icon icon-car-service-2 text-7xl mb-4 mx-auto inline-block"></i>
                            <div class="feature-shadow-icon">
                                <i class="icon-car-service-2"></i>
                            </div>
                            <h2 className="card-title">Modern Machines</h2>
                            <p className="card-desc">Contrary to popular belief psum is top simply random.</p>
                        </div>
                        <div className="card">
                            <i class="feature-icon icon-car-service-3  text-7xl mb-4 mx-auto inline-block"></i>
                            <div class="feature-shadow-icon">
                                <i class="icon-car-service-3"></i>
                            </div>
                            <h2 className="card-title">Affordable Pricing</h2>
                            <p className="card-desc">Contrary to popular belief psum is top simply random.</p>
                        </div>
                    </div>
                </div>
                <div className='container'>
                    <div className='about'>
                        <div className={`${active ? "about-left active" : "about-left"}`} >
                            <div><img src={Foto1} alt="" /></div>
                            <div> <img src={Foto2} alt="" /></div>
                            {/* <div><img src={Foto3} alt="" /> </div> */}
                        </div>
                        <div className={`${active ? "about-right active" : "about-right"}`}>
                            <div className="about-right-top">
                                <div className="clients">
                                    <img src={Foto4} alt="" />
                                    <img src={Foto5} alt="" />
                                    <img src={Foto6} alt="" />
                                </div>
                                <p>Mostly clients happy!</p>
                            </div>
                            <div className="about-right-bottom">
                                <h2>about us</h2>
                                <p>We Provide Quality <span>Car Washing</span> Services</p>
                                <p className='text-[#666666]'>E-Learning Adventures is committed to transforming the traditional learning landscape. With a blend
                                    of engaging content, interactive exercises, and cutting-edge technology, we ensure every learner
                                    finds their path to success
                                </p>
                                <button className="learn-more">learn more!</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>

    )
}

export default About