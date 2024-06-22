import React from 'react'
import './HeroCard.css'
import { Link } from 'react-router-dom'
const HeroCard = ({ page }) => {
    return (
        <section className="hero">
            {/* <div className="overlay"> */}
            <div className="container">

                <div className="hero-content">
                    <h2> {page} Page</h2>
                    <div>
                        <Link to={"/"}>Home </Link>
                        //
                        <span>  {page}</span>
                    </div>
                    {/* <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </p> */}
                </div>
            </div>
            {/* </div> */}
        </section>
    )
}

export default HeroCard
