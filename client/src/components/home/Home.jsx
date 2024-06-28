import React from 'react'
import './Home.css'
import Heroimage from './homeitems/heroimage/Heroimage'
import About from './homeitems/about/About'
import OurServices from './homeitems/our-services/OurServices'
import Bestseller from './homeitems/bestseller/Bestseller'
import Portfolio from './homeitems/portfolio/Portfolio'
import Number from './homeitems/numbers/Number'
import Work from './homeitems/work/Work'
import ChooseUs from './homeitems/chooseus/ChooseUs'
import Application from './homeitems/application/Application'
import Testimonials from './homeitems/testimonials/Testimonials'
import Blog from './homeitems/blog/Blog'
import Recommendation from './homeitems/recommendation/Recommendation'
const Home = () => {

    return (
        <>
            <Heroimage />
            <About />
            <OurServices />
            <Bestseller />
            <Number />
            <Portfolio />
            <Work />
            {/* <Cta /> */}
            <ChooseUs />
            <Application />
            <Testimonials />
            <Blog />
            {/* <Recommendation /> */}

        </>
    )
}

export default Home