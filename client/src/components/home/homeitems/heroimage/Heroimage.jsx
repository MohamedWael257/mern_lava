import React from 'react'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'

const Heroimage = () => {
    return (
        <div id="carouselExampleCap" data-bs-ride="carousel" className="carousel slide">
            <div className="img-cards carousel-inner home">
                <div className="carousel-item ng-star-inserted home-content active one">
                    <div className='containe'>
                        <h6 className="title"> Keep Your Car Clean</h6>
                        <h3 className="hero-title">
                            We Provide Car <span>Washing</span> Services
                        </h3>
                        <p className="home-desc">There are many variations of passages orem psum available but the majority have
                            suffered alteration in some form by injected humour or randomised words which
                            don't look even making it look like readable slightly believable.
                        </p>
                        <button id="start" className="btn btn-start">about Me !</button>
                        <button id="learn" className="btn btn-learn"> Learn More</button>
                    </div>
                </div>
                <div className="carousel-item ng-star-inserted home-content two">
                    <div className='containe'>
                        < h6 className="title"> Keep Your Car Clean</h6>
                        <h3 className="hero-title">
                            We Provide Car <span>Washing</span> Services
                        </h3>
                        <p className="home-desc">There are many variations of passages orem psum available but the majority have
                            suffered alteration in some form by injected humour or randomised words which
                            don't look even making it look like readable slightly believable.
                        </p>
                        <button id="start" className="btn btn-start">about Me !</button>
                        <button id="learn" className="btn btn-learn"> Learn More</button>
                    </div>
                </div>
                <div className="carousel-item ng-star-inserted home-content three">
                    <div className='containe'>
                        < h6 className="title"> Keep Your Car Clean</h6>
                        <h3 className="hero-title">
                            We Provide Car <span>Washing</span> Services
                        </h3>
                        <p className="home-desc">There are many variations of passages orem psum available but the majority have
                            suffered alteration in some form by injected humour or randomised words which
                            don't look even making it look like readable slightly believable.
                        </p>
                        <button id="start" className="btn btn-start">about Me !</button>
                        <button id="learn" className="btn btn-learn"> Learn More</button>

                    </div>

                </div>
            </div>
            <button type="button" data-bs-target="#carouselExampleCap" data-bs-slide="prev"
                className="carousel-control-prev">
                <IoIosArrowBack size={35} aria-hidden="true" className="carousel-control-prev-icon bg-[#343434] rounded-full text-[#fff] w-12 h-12" />
                <span className="hidden">Previous</span>
            </button>
            <button type="button" data-bs-target="#carouselExampleCap" data-bs-slide="next"
                className="carousel-control-next">
                <IoIosArrowForward size={35} aria-hidden="true" className="carousel-control-next-icon bg-[#343434] rounded-full text-[#fff] w-12 h-12" />
                <span className="hidden">Next</span>
            </button>
        </div>
    )
}

export default Heroimage