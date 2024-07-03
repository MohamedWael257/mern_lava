import React from 'react'
import './NotFound.css'
import four from '../../assets/Number-4.png'
import wheel from '../../assets/Wheel-With-Red-Rim-1.png'
import { Link, useNavigate } from 'react-router-dom'
import HeroCard from '../../components/ui/herocard/HeroCard'
const NotFound = () => {
    const navigate = useNavigate()
    return (
        <>
            <HeroCard page={"Not-Found"} />
            <div className="notfound">
                <div className="images">
                    <p></p>
                    {/* <img src={four} alt="" /> */}
                    <img src={wheel} alt="" />
                    {/* <img src={four} alt="" /> */}
                    <p></p>
                </div>
                <h2>page not found</h2>
                <Link to={'/'}>back to home</Link>
            </div>
        </>
    )
}

export default NotFound