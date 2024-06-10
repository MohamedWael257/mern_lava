import React, { useEffect, useRef, useState } from 'react'
import './OurServices.css'

import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addservicetobooking } from '../../../../redux/slice/bookingslice'
import { servicesdata } from '../../../../redux/slice/serviceslice'
const OurServices = () => {
  const services = useSelector(servicesdata)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const ourservicesref = useRef()
  const addservicebooking = (ele) => {
    // dispatch(addservicetobooking(ele))
    // navigate(`/bookingdetails/${ele.id}`)
    navigate('/booking')
  }

  return (
    <section className="our-services" ref={ourservicesref}>
      {/* <div className="elementor-shape elementor-shape-top" data-negative="false">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 100" preserveAspectRatio="none">
                <path className="elementor-shape-fill"
                    d="M1000,4.3V0H0v4.3C0.9,23.1,126.7,99.2,500,100S1000,22.7,1000,4.3z"></path>
            </svg>
        </div>  */}
      <h3>our services</h3>
      <h2><span>What We</span> Offer</h2>
      <div className="container-cards">
        {
          services && services.map((ele, index) => {
            return (
              <div className=" card" key={index}>
                <img className="card-icon" src={ele.ImageUrl} alt="img" />
                <h3 className="card-title">{ele.title}</h3>
                {/* <p className="card-desc">{ele.description}</p> */}
                <p className="card-desc">
                  Lorem ipsum dolor sit amet consectetur. Mauris mauris tortor aliquam adipiscing.
                </p>
                <button className="card-btn" onClick={() => addservicebooking(ele)}>Add booking</button>
              </div>
            )
          })
        }
      </div>
    </section>
  )
}

export default OurServices