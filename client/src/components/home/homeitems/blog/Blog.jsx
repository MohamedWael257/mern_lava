import React, { memo } from 'react'
import './Blog.css'
import { IoMdPerson } from 'react-icons/io'
import Image1 from '../../../../assets/img/blog/01.jpg'
import Image2 from '../../../../assets/img/blog/02.jpg'
import Image3 from '../../../../assets/img/blog/03.jpg'
import { useLocation } from 'react-router-dom'
import HeroCard from '../../../ui/herocard/HeroCard'

const Blog = memo(() => {
    const { pathname } = useLocation();
    return (
        <>
            {pathname == '/blog' &&
                <HeroCard page={'Blog'} />
            }
            <section className="blog">
                <h3>our blog</h3>
                <h2>latest new & <span>blog</span></h2>
                <div className="cards">
                    <div className="card">
                        <img src={Image1} alt="img" />
                        <div className="card-details">
                            <p><i className="far fa-user-circle"></i> By Alicia Davis</p>
                            <p><i className="far fa-calendar-alt"></i> March 16, 2023</p>
                        </div>
                        <p className="card-desc">There Are Many Variations Of The Passages Available Suffered</p>
                        <button className="read-more">read more</button>
                    </div>
                    <div className="card">
                        <img src={Image2} alt="img" />
                        <div className="card-details">
                            <p><i className="far fa-user-circle"></i> By Alicia Davis</p>
                            <p><i className="far fa-calendar-alt"></i> March 16, 2023</p>
                        </div>
                        <p className="card-desc">There Are Many Variations Of The Passages Available Suffered</p>
                        <button className="read-more">read more</button>
                    </div>
                    <div className="card">
                        <img src={Image3} alt="img" />
                        <div className="card-details">
                            <p><i className="far fa-user-circle"></i> By Alicia Davis</p>
                            <p><i className="far fa-calendar-alt"></i> March 16, 2023</p>
                        </div>
                        <p className="card-desc">There Are Many Variations Of The Passages Available Suffered</p>
                        <button className="read-more">read more</button>
                    </div>
                </div>
            </section>
        </>
    )
})

export default Blog