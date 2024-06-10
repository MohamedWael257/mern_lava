import React, { useRef, useState } from 'react'
import './Booking.css'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { servicesdata } from '../../redux/slice/serviceslice'
import HeroCard from '../ui/herocard/HeroCard'

const Booking = () => {
    const [location, setLocation] = useState(false)
    const [active, setActive] = useState(true)
    const ourservicesref = useRef()
    const services = useSelector(servicesdata)
    const navigate = useNavigate()
    const addservicebooking = (ele) => {
        // dispatch(addservicetobooking(ele))
        navigate(`/bookingdetails/${ele.id}`)
    }


    return (
        <>
            {/* {location && */}
            <HeroCard page={'Online Booking'} />
            <section ref={ourservicesref} className="our-services">
                {/* <section ref={ourservicesref} className="our-services-booking"> */}
                <h3>our services</h3>
                <h2>Our<span> comprehensive</span> Offer</h2>
                <div className="container-cards" >
                    {
                        services && services.map((ele, index) => {
                            return (
                                <div className={`${active ? "card active" : "card"}`} key={index}>
                                    <img className="card-icon" src={ele.ImageUrl} alt="img" />
                                    <h3 className="card-title">{ele.title}</h3>
                                    <p className="card-desc">{ele.description}</p>
                                    <button className="card-btn" onClick={() => addservicebooking(ele)}>Add booking</button>
                                </div>
                            )
                        })
                    }
                </div>

            </section>

            {/* } */}

        </>
    )
}

export default Booking