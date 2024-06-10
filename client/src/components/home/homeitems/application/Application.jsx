import React, { memo } from 'react'
import image from '../../../../assets/img/app/iPhone 15.png'
import googleplay from '../../../../assets/img/app/googleplay.png'
import './Application.css'
const Application = memo(() => {
    return (
        <section className="app">
            <div className="left">
                <img src={image} alt="" />
            </div>
            <div className="right">
                <h2>Download Lava App</h2>
                <p>LAVA is an application that combines car wash and
                    car dealership services. The application provides a
                    unique user experience, as it can help you wash the car
                    and purchase car tools easily through the application</p>
                <button>
                    <span>Available On Google PLAY</span>
                    <img src={googleplay} alt="" />
                </button>
            </div>
        </section>)
})

export default Application